import frappe
from frappe.model.document import Document
from frappe.utils import now, get_datetime, time_diff_in_seconds
import json

class RestaurantOrder(Document):
    def validate(self):
        self.set_order_total()
        self.validate_table_availability()
        
    def before_insert(self):
        if not self.order_time:
            self.order_time = now()
        self.set_estimated_completion_time()
        
    def on_submit(self):
        self.send_to_kitchen()
        self.update_table_status()
        
    def on_cancel(self):
        self.cancel_kitchen_order()
        self.free_table()
        
    def set_order_total(self):
        total = 0
        for item in self.items:
            item.amount = item.rate * item.qty
            total += item.amount
        self.total_amount = total
        
    def validate_table_availability(self):
        if self.order_type == "Dine In" and self.table:
            table_doc = frappe.get_doc("Restaurant Table", self.table)
            if table_doc.status != "Available" and not self.is_new():
                frappe.throw(f"Table {self.table} is not available")
                
    def set_estimated_completion_time(self):
        total_prep_time = 0
        for item in self.items:
            item_doc = frappe.get_doc("Item", item.item_code)
            prep_time = getattr(item_doc, 'preparation_time', 0) or 0
            total_prep_time = max(total_prep_time, prep_time)
        
        if total_prep_time:
            from datetime import datetime, timedelta
            order_time = get_datetime(self.order_time)
            self.estimated_completion_time = order_time + timedelta(minutes=total_prep_time)
            
    def send_to_kitchen(self):
        # Send real-time notification to kitchen display
        frappe.publish_realtime(
            event="new_kitchen_order",
            message={
                "order_id": self.name,
                "table": self.table,
                "order_type": self.order_type,
                "items": [{"item": item.item_code, "qty": item.qty, "notes": item.notes} for item in self.items],
                "special_instructions": self.special_instructions,
                "order_time": self.order_time,
                "estimated_completion": self.estimated_completion_time
            },
            room="kitchen"
        )
        
    def update_table_status(self):
        if self.order_type == "Dine In" and self.table:
            table_doc = frappe.get_doc("Restaurant Table", self.table)
            table_doc.status = "Occupied"
            table_doc.current_order = self.name
            table_doc.save()
            
    def cancel_kitchen_order(self):
        frappe.publish_realtime(
            event="cancel_kitchen_order",
            message={"order_id": self.name},
            room="kitchen"
        )
        
    def free_table(self):
        if self.order_type == "Dine In" and self.table:
            table_doc = frappe.get_doc("Restaurant Table", self.table)
            table_doc.status = "Available"
            table_doc.current_order = ""
            table_doc.save()

@frappe.whitelist()
def update_order_status(order_id, status, item_updates=None):
    """Update order status and item preparation status"""
    order = frappe.get_doc("Restaurant Order", order_id)
    
    if status:
        order.status = status
        if status == "Completed":
            order.completion_time = now()
            
    if item_updates:
        item_updates = json.loads(item_updates) if isinstance(item_updates, str) else item_updates
        for update in item_updates:
            for item in order.items:
                if item.item_code == update.get("item_code"):
                    item.preparation_status = update.get("status")
                    break
                    
    order.save()
    
    # Send real-time update
    frappe.publish_realtime(
        event="order_status_update",
        message={
            "order_id": order_id,
            "status": status,
            "items": item_updates
        },
        room="restaurant"
    )
    
    return {"status": "success"}

@frappe.whitelist()
def get_kitchen_orders():
    """Get all pending orders for kitchen display"""
    orders = frappe.db.sql("""
        SELECT 
            ro.name, ro.table, ro.order_type, ro.order_time,
            ro.estimated_completion_time, ro.special_instructions,
            ro.status, roi.item_code, roi.qty, roi.notes,
            roi.preparation_status, i.item_name
        FROM `tabRestaurant Order` ro
        LEFT JOIN `tabRestaurant Order Item` roi ON ro.name = roi.parent
        LEFT JOIN `tabItem` i ON roi.item_code = i.name
        WHERE ro.status IN ('Pending', 'In Progress', 'Ready')
        ORDER BY ro.order_time ASC
    """, as_dict=True)
    
    # Group items by order
    grouped_orders = {}
    for row in orders:
        order_id = row['name']
        if order_id not in grouped_orders:
            grouped_orders[order_id] = {
                'order_id': order_id,
                'table': row['table'],
                'order_type': row['order_type'],
                'order_time': row['order_time'],
                'estimated_completion_time': row['estimated_completion_time'],
                'special_instructions': row['special_instructions'],
                'status': row['status'],
                'items': []
            }
        
        if row['item_code']:
            grouped_orders[order_id]['items'].append({
                'item_code': row['item_code'],
                'item_name': row['item_name'],
                'qty': row['qty'],
                'notes': row['notes'],
                'preparation_status': row['preparation_status']
            })
    
    return list(grouped_orders.values())

@frappe.whitelist()
def get_order_status_display():
    """Get orders for customer-facing status display"""
    orders = frappe.db.sql("""
        SELECT 
            name, table_no, order_type, status,
            order_time, estimated_completion_time,
            CASE 
                WHEN status = 'Completed' THEN 'Ready for Pickup'
                WHEN status = 'In Progress' THEN 'Being Prepared'
                WHEN status = 'Ready' THEN 'Ready'
                ELSE 'Received'
            END as display_status
        FROM `tabRestaurant Order`
        WHERE status IN ('Pending', 'In Progress', 'Ready', 'Completed')
        AND DATE(order_time) = CURDATE()
        ORDER BY order_time DESC
        LIMIT 20
    """, as_dict=True)
    
    return orders