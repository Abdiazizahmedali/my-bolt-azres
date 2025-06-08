import frappe
from frappe.utils import now

def on_submit(doc, method):
    """Handle POS Invoice submission for restaurant orders"""
    
    # Create or update restaurant order
    if doc.order_type and doc.order_type in ['Dine In', 'Takeaway', 'Delivery']:
        create_restaurant_order_from_pos(doc)
        
def on_cancel(doc, method):
    """Handle POS Invoice cancellation"""
    
    # Cancel related restaurant order if exists
    restaurant_order = frappe.db.get_value("Restaurant Order", {"pos_invoice": doc.name}, "name")
    if restaurant_order:
        order_doc = frappe.get_doc("Restaurant Order", restaurant_order)
        if order_doc.docstatus == 1:
            order_doc.cancel()

def create_restaurant_order_from_pos(pos_invoice):
    """Create restaurant order from POS Invoice"""
    
    # Check if order already exists
    existing_order = frappe.db.get_value("Restaurant Order", {"pos_invoice": pos_invoice.name}, "name")
    if existing_order:
        return existing_order
    
    # Create restaurant order
    order = frappe.get_doc({
        "doctype": "Restaurant Order",
        "order_type": pos_invoice.order_type,
        "table": pos_invoice.restaurant_table,
        "customer": pos_invoice.customer,
        "order_time": pos_invoice.posting_date + " " + pos_invoice.posting_time,
        "pos_invoice": pos_invoice.name,
        "total_amount": pos_invoice.grand_total,
        "paid_amount": pos_invoice.paid_amount,
        "outstanding_amount": pos_invoice.outstanding_amount,
        "special_instructions": pos_invoice.kitchen_notes or "",
        "status": "Pending",
        "items": []
    })
    
    # Add items
    for item in pos_invoice.items:
        # Check if item is a food item
        is_food_item = frappe.db.get_value("Item", item.item_code, "is_food_item")
        if is_food_item:
            order.append("items", {
                "item_code": item.item_code,
                "qty": item.qty,
                "rate": item.rate,
                "amount": item.amount,
                "preparation_status": "Pending"
            })
    
    if order.items:  # Only create order if there are food items
        order.insert(ignore_permissions=True)
        order.submit()
        return order.name
    
    return None

@frappe.whitelist()
def get_available_tables():
    """Get available tables for POS"""
    tables = frappe.get_all(
        "Restaurant Table",
        filters={"status": "Available"},
        fields=["name", "table_number", "capacity"],
        order_by="table_number"
    )
    return tables

@frappe.whitelist()
def reserve_table(table_name, pos_profile=None):
    """Reserve table for current POS session"""
    table = frappe.get_doc("Restaurant Table", table_name)
    table.status = "Reserved"
    table.save()
    
    return {"status": "success", "message": f"Table {table.table_number} reserved"}

@frappe.whitelist()
def release_table(table_name):
    """Release table reservation"""
    table = frappe.get_doc("Restaurant Table", table_name)
    table.status = "Available"
    table.current_order = ""
    table.save()
    
    return {"status": "success", "message": f"Table {table.table_number} released"}