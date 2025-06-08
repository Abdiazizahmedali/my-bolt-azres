import frappe
from frappe.model.document import Document

class RestaurantTable(Document):
    def validate(self):
        self.validate_capacity()
        
    def validate_capacity(self):
        if self.capacity <= 0:
            frappe.throw("Table capacity must be greater than 0")
            
    def get_current_order(self):
        if self.status == "Occupied" and self.current_order:
            return frappe.get_doc("Restaurant Order", self.current_order)
        return None

@frappe.whitelist()
def get_table_layout():
    """Get table layout for floor plan display"""
    tables = frappe.get_all(
        "Restaurant Table",
        fields=["name", "table_number", "capacity", "status", "current_order", "x_position", "y_position", "shape"],
        order_by="table_number"
    )
    
    for table in tables:
        if table.current_order:
            order = frappe.get_doc("Restaurant Order", table.current_order)
            table.order_time = order.order_time
            table.customer = order.customer
            
    return tables

@frappe.whitelist()
def update_table_status(table_name, status):
    """Update table status"""
    table = frappe.get_doc("Restaurant Table", table_name)
    table.status = status
    if status == "Available":
        table.current_order = ""
    table.save()
    
    # Send real-time update
    frappe.publish_realtime(
        event="table_status_update",
        message={"table": table_name, "status": status},
        room="restaurant"
    )
    
    return {"status": "success"}