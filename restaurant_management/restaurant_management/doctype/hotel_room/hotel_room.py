import frappe
from frappe.model.document import Document
from frappe.utils import today, add_days

class HotelRoom(Document):
    def validate(self):
        self.validate_room_number()
        
    def validate_room_number(self):
        if not self.room_number:
            frappe.throw("Room number is required")
            
    def get_current_booking(self):
        """Get current active booking for this room"""
        today_date = today()
        
        booking = frappe.db.get_value(
            "Room Booking",
            {
                "room": self.name,
                "check_in_date": ["<=", today_date],
                "check_out_date": [">", today_date],
                "status": ["in", ["Confirmed", "Checked In"]]
            },
            ["name", "guest", "check_in_date", "check_out_date", "status"],
            as_dict=True
        )
        
        return booking
        
    def is_available_for_dates(self, check_in, check_out):
        """Check if room is available for given dates"""
        conflicting_bookings = frappe.db.count(
            "Room Booking",
            {
                "room": self.name,
                "status": ["in", ["Confirmed", "Checked In"]],
                "$or": [
                    {
                        "check_in_date": ["between", [check_in, check_out]]
                    },
                    {
                        "check_out_date": ["between", [check_in, check_out]]
                    },
                    {
                        "check_in_date": ["<=", check_in],
                        "check_out_date": [">=", check_out]
                    }
                ]
            }
        )
        
        return conflicting_bookings == 0

@frappe.whitelist()
def get_room_availability(check_in_date, check_out_date, room_type=None):
    """Get available rooms for given dates"""
    conditions = []
    values = []
    
    if room_type:
        conditions.append("hr.room_type = %s")
        values.append(room_type)
    
    # Get all rooms
    rooms_query = """
        SELECT hr.name, hr.room_number, hr.room_type, hr.capacity, 
               hr.rate_per_night, hr.amenities, hr.status
        FROM `tabHotel Room` hr
        WHERE hr.status = 'Available'
    """
    
    if conditions:
        rooms_query += " AND " + " AND ".join(conditions)
    
    rooms = frappe.db.sql(rooms_query, values, as_dict=True)
    
    # Filter out rooms with conflicting bookings
    available_rooms = []
    for room in rooms:
        if frappe.get_doc("Hotel Room", room.name).is_available_for_dates(check_in_date, check_out_date):
            available_rooms.append(room)
    
    return available_rooms

@frappe.whitelist()
def get_hotel_dashboard_data():
    """Get hotel dashboard data"""
    today_date = today()
    
    # Room statistics
    total_rooms = frappe.db.count("Hotel Room")
    occupied_rooms = frappe.db.count("Hotel Room", {"status": "Occupied"})
    available_rooms = total_rooms - occupied_rooms
    
    # Today's bookings
    todays_checkins = frappe.db.count("Room Booking", {
        "check_in_date": today_date,
        "status": ["in", ["Confirmed", "Checked In"]]
    })
    
    todays_checkouts = frappe.db.count("Room Booking", {
        "check_out_date": today_date,
        "status": "Checked In"
    })
    
    # Revenue
    monthly_revenue = frappe.db.sql("""
        SELECT COALESCE(SUM(total_amount), 0) as revenue
        FROM `tabRoom Booking`
        WHERE MONTH(check_in_date) = MONTH(%s)
        AND YEAR(check_in_date) = YEAR(%s)
        AND status IN ('Confirmed', 'Checked In', 'Checked Out')
    """, (today_date, today_date))[0][0]
    
    # Recent bookings
    recent_bookings = frappe.db.sql("""
        SELECT name, guest_name, room, check_in_date, check_out_date, status
        FROM `tabRoom Booking`
        ORDER BY creation DESC
        LIMIT 10
    """, as_dict=True)
    
    return {
        "room_stats": {
            "total": total_rooms,
            "occupied": occupied_rooms,
            "available": available_rooms,
            "occupancy_rate": (occupied_rooms / total_rooms * 100) if total_rooms > 0 else 0
        },
        "todays_activity": {
            "checkins": todays_checkins,
            "checkouts": todays_checkouts
        },
        "revenue": {
            "monthly": monthly_revenue
        },
        "recent_bookings": recent_bookings
    }