from frappe import _

def get_data():
    return [
        {
            "label": _("Restaurant Operations"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Restaurant Order",
                    "label": _("Restaurant Order"),
                    "description": _("Manage restaurant orders"),
                },
                {
                    "type": "doctype",
                    "name": "Restaurant Table",
                    "label": _("Restaurant Table"),
                    "description": _("Manage restaurant tables"),
                },
                {
                    "type": "doctype",
                    "name": "Table Reservation",
                    "label": _("Table Reservation"),
                    "description": _("Manage table reservations"),
                },
                {
                    "type": "page",
                    "name": "kitchen-display",
                    "label": _("Kitchen Display"),
                    "description": _("Kitchen order display system"),
                },
                {
                    "type": "page",
                    "name": "order-status",
                    "label": _("Order Status Screen"),
                    "description": _("Customer order status display"),
                },
                {
                    "type": "page",
                    "name": "waiter-interface",
                    "label": _("Waiter Interface"),
                    "description": _("Waiter order management interface"),
                }
            ]
        },
        {
            "label": _("Hotel Management"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Hotel Room",
                    "label": _("Hotel Room"),
                    "description": _("Manage hotel rooms"),
                },
                {
                    "type": "doctype",
                    "name": "Room Booking",
                    "label": _("Room Booking"),
                    "description": _("Manage room bookings"),
                },
                {
                    "type": "doctype",
                    "name": "Guest Registration",
                    "label": _("Guest Registration"),
                    "description": _("Register hotel guests"),
                },
                {
                    "type": "page",
                    "name": "hotel-dashboard",
                    "label": _("Hotel Dashboard"),
                    "description": _("Hotel management dashboard"),
                }
            ]
        },
        {
            "label": _("Settings & Configuration"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Restaurant Settings",
                    "label": _("Restaurant Settings"),
                    "description": _("Configure restaurant settings"),
                },
                {
                    "type": "doctype",
                    "name": "Kitchen Printer",
                    "label": _("Kitchen Printer"),
                    "description": _("Configure kitchen printers"),
                },
                {
                    "type": "doctype",
                    "name": "Menu Category",
                    "label": _("Menu Category"),
                    "description": _("Manage menu categories"),
                }
            ]
        },
        {
            "label": _("Reports"),
            "items": [
                {
                    "type": "report",
                    "name": "Restaurant Sales Report",
                    "label": _("Restaurant Sales Report"),
                    "doctype": "Restaurant Order",
                    "is_query_report": True
                },
                {
                    "type": "report",
                    "name": "Kitchen Performance Report",
                    "label": _("Kitchen Performance Report"),
                    "doctype": "Restaurant Order",
                    "is_query_report": True
                },
                {
                    "type": "report",
                    "name": "Hotel Occupancy Report",
                    "label": _("Hotel Occupancy Report"),
                    "doctype": "Room Booking",
                    "is_query_report": True
                },
                {
                    "type": "report",
                    "name": "Table Utilization Report",
                    "label": _("Table Utilization Report"),
                    "doctype": "Restaurant Table",
                    "is_query_report": True
                }
            ]
        }
    ]