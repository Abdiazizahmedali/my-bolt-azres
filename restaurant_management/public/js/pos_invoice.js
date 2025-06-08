frappe.ui.form.on('POS Invoice', {
    refresh: function(frm) {
        // Add custom buttons for restaurant operations
        if (frm.doc.docstatus === 1 && frm.doc.order_type) {
            frm.add_custom_button(__('View Kitchen Order'), function() {
                frappe.route_options = {"pos_invoice": frm.doc.name};
                frappe.set_route("List", "Restaurant Order");
            });
        }
        
        // Load available tables
        if (frm.doc.order_type === 'Dine In') {
            load_available_tables(frm);
        }
    },
    
    order_type: function(frm) {
        if (frm.doc.order_type === 'Dine In') {
            load_available_tables(frm);
            frm.set_df_property('restaurant_table', 'reqd', 1);
        } else {
            frm.set_value('restaurant_table', '');
            frm.set_df_property('restaurant_table', 'reqd', 0);
        }
    },
    
    restaurant_table: function(frm) {
        if (frm.doc.restaurant_table && frm.doc.order_type === 'Dine In') {
            // Reserve table
            frappe.call({
                method: 'restaurant_management.api.pos_invoice.reserve_table',
                args: {
                    table_name: frm.doc.restaurant_table
                },
                callback: function(r) {
                    if (r.message && r.message.status === 'success') {
                        frappe.show_alert({
                            message: r.message.message,
                            indicator: 'green'
                        });
                    }
                }
            });
        }
    }
});

function load_available_tables(frm) {
    frappe.call({
        method: 'restaurant_management.api.pos_invoice.get_available_tables',
        callback: function(r) {
            if (r.message) {
                let options = r.message.map(table => table.name);
                frm.set_df_property('restaurant_table', 'options', options);
            }
        }
    });
}

// Auto-set naming series based on order type
frappe.ui.form.on('POS Invoice', {
    order_type: function(frm) {
        if (frm.doc.order_type && !frm.doc.naming_series) {
            let series_map = {
                'Dine In': 'DI-',
                'Takeaway': 'TO-', 
                'Delivery': 'DL-'
            };
            
            if (series_map[frm.doc.order_type]) {
                frm.set_value('naming_series', series_map[frm.doc.order_type] + 'YYYY-MM-DD-#####');
            }
        }
    }
});