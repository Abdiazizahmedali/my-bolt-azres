import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def after_install():
    """Post installation setup"""
    create_custom_fields_for_restaurant()
    create_default_restaurant_settings()
    create_sample_data()
    setup_roles_and_permissions()

def create_custom_fields_for_restaurant():
    """Create custom fields in ERPNext doctypes"""
    
    # Custom fields for POS Invoice
    pos_invoice_fields = [
        {
            'fieldname': 'restaurant_table',
            'label': 'Restaurant Table',
            'fieldtype': 'Link',
            'options': 'Restaurant Table',
            'insert_after': 'customer'
        },
        {
            'fieldname': 'order_type',
            'label': 'Order Type',
            'fieldtype': 'Select',
            'options': '\nDine In\nTakeaway\nDelivery',
            'insert_after': 'restaurant_table'
        },
        {
            'fieldname': 'kitchen_notes',
            'label': 'Kitchen Notes',
            'fieldtype': 'Small Text',
            'insert_after': 'order_type'
        }
    ]
    
    # Custom fields for Sales Invoice
    sales_invoice_fields = [
        {
            'fieldname': 'restaurant_table',
            'label': 'Restaurant Table',
            'fieldtype': 'Link',
            'options': 'Restaurant Table',
            'insert_after': 'customer'
        },
        {
            'fieldname': 'order_type',
            'label': 'Order Type',
            'fieldtype': 'Select',
            'options': '\nDine In\nTakeaway\nDelivery',
            'insert_after': 'restaurant_table'
        }
    ]
    
    # Custom fields for Item
    item_fields = [
        {
            'fieldname': 'is_food_item',
            'label': 'Is Food Item',
            'fieldtype': 'Check',
            'insert_after': 'is_stock_item'
        },
        {
            'fieldname': 'preparation_time',
            'label': 'Preparation Time (Minutes)',
            'fieldtype': 'Int',
            'depends_on': 'is_food_item',
            'insert_after': 'is_food_item'
        },
        {
            'fieldname': 'kitchen_printer',
            'label': 'Kitchen Printer',
            'fieldtype': 'Link',
            'options': 'Kitchen Printer',
            'depends_on': 'is_food_item',
            'insert_after': 'preparation_time'
        }
    ]
    
    custom_fields = {
        'POS Invoice': pos_invoice_fields,
        'Sales Invoice': sales_invoice_fields,
        'Item': item_fields
    }
    
    create_custom_fields(custom_fields)

def create_default_restaurant_settings():
    """Create default restaurant settings"""
    if not frappe.db.exists("Restaurant Settings", "Restaurant Settings"):
        settings = frappe.get_doc({
            "doctype": "Restaurant Settings",
            "name": "Restaurant Settings",
            "restaurant_name": "My Restaurant",
            "default_currency": "USD",
            "auto_print_kitchen_orders": 1,
            "order_timeout_minutes": 30,
            "enable_table_reservation": 1
        })
        settings.insert(ignore_permissions=True)

def create_sample_data():
    """Create sample tables and menu categories"""
    
    # Create sample tables
    sample_tables = [
        {"table_number": "T01", "capacity": 2, "floor": "Ground Floor"},
        {"table_number": "T02", "capacity": 4, "floor": "Ground Floor"},
        {"table_number": "T03", "capacity": 6, "floor": "Ground Floor"},
        {"table_number": "T04", "capacity": 2, "floor": "First Floor"},
        {"table_number": "T05", "capacity": 4, "floor": "First Floor"}
    ]
    
    for table_data in sample_tables:
        if not frappe.db.exists("Restaurant Table", table_data["table_number"]):
            table = frappe.get_doc({
                "doctype": "Restaurant Table",
                **table_data
            })
            table.insert(ignore_permissions=True)
    
    # Create sample menu categories
    sample_categories = [
        {"category_name": "Appetizers", "description": "Starters and small plates"},
        {"category_name": "Main Course", "description": "Main dishes"},
        {"category_name": "Desserts", "description": "Sweet endings"},
        {"category_name": "Beverages", "description": "Drinks and refreshments"}
    ]
    
    for category_data in sample_categories:
        if not frappe.db.exists("Menu Category", category_data["category_name"]):
            category = frappe.get_doc({
                "doctype": "Menu Category",
                **category_data
            })
            category.insert(ignore_permissions=True)
    
    # Create sample hotel rooms
    sample_rooms = [
        {"room_number": "101", "room_type": "Standard", "capacity": 2, "rate_per_night": 100, "floor_number": 1},
        {"room_number": "102", "room_type": "Deluxe", "capacity": 2, "rate_per_night": 150, "floor_number": 1},
        {"room_number": "201", "room_type": "Suite", "capacity": 4, "rate_per_night": 250, "floor_number": 2},
        {"room_number": "202", "room_type": "Family", "capacity": 6, "rate_per_night": 200, "floor_number": 2}
    ]
    
    for room_data in sample_rooms:
        if not frappe.db.exists("Hotel Room", room_data["room_number"]):
            room = frappe.get_doc({
                "doctype": "Hotel Room",
                **room_data
            })
            room.insert(ignore_permissions=True)

def setup_roles_and_permissions():
    """Create restaurant-specific roles"""
    
    roles = [
        {
            "role_name": "Restaurant Manager",
            "desk_access": 1
        },
        {
            "role_name": "Restaurant User", 
            "desk_access": 1
        },
        {
            "role_name": "Kitchen Staff",
            "desk_access": 1
        },
        {
            "role_name": "Waiter",
            "desk_access": 1
        },
        {
            "role_name": "Hotel Manager",
            "desk_access": 1
        },
        {
            "role_name": "Hotel User",
            "desk_access": 1
        }
    ]
    
    for role_data in roles:
        if not frappe.db.exists("Role", role_data["role_name"]):
            role = frappe.get_doc({
                "doctype": "Role",
                **role_data
            })
            role.insert(ignore_permissions=True)