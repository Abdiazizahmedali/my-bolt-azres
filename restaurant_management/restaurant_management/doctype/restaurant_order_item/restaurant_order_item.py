import frappe
from frappe.model.document import Document

class RestaurantOrderItem(Document):
    def validate(self):
        self.calculate_amount()
        
    def calculate_amount(self):
        self.amount = self.rate * self.qty