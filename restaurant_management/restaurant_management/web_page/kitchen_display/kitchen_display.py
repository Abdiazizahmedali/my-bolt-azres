import frappe

def get_context(context):
    context.no_cache = 1
    context.show_sidebar = False
    
    # Get restaurant settings
    settings = frappe.get_single("Restaurant Settings")
    context.settings = settings
    
    return context