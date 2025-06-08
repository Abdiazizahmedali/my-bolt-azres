import React, { useState } from 'react';
import { Users, Clock, CheckCircle, AlertCircle, Plus, Eye } from 'lucide-react';

const WaiterInterface = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const tables = [
    { id: 'T-01', capacity: 2, status: 'available', order: null },
    { id: 'T-02', capacity: 4, status: 'occupied', order: 'ORD-001' },
    { id: 'T-03', capacity: 6, status: 'occupied', order: 'ORD-002' },
    { id: 'T-04', capacity: 2, status: 'reserved', order: null },
    { id: 'T-05', capacity: 4, status: 'occupied', order: 'ORD-003' },
    { id: 'T-06', capacity: 8, status: 'available', order: null },
  ];

  const orders = [
    {
      id: 'ORD-001',
      table: 'T-02',
      customer: 'John Smith',
      orderTime: '12:15 PM',
      status: 'in-progress',
      items: [
        { name: 'Grilled Chicken', qty: 2, status: 'preparing' },
        { name: 'Caesar Salad', qty: 1, status: 'ready' }
      ],
      total: 45.50
    },
    {
      id: 'ORD-002',
      table: 'T-03',
      customer: 'Sarah Johnson',
      orderTime: '12:20 PM',
      status: 'ready',
      items: [
        { name: 'Fish & Chips', qty: 2, status: 'ready' },
        { name: 'Onion Rings', qty: 1, status: 'ready' }
      ],
      total: 32.00
    },
    {
      id: 'ORD-003',
      table: 'T-05',
      customer: 'Mike Wilson',
      orderTime: '12:25 PM',
      status: 'pending',
      items: [
        { name: 'Burger Deluxe', qty: 1, status: 'pending' },
        { name: 'French Fries', qty: 1, status: 'pending' }
      ],
      total: 18.50
    }
  ];

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 border-green-300 text-green-800';
      case 'occupied': return 'bg-red-100 border-red-300 text-red-800';
      case 'reserved': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">👨‍💼 Waiter Interface</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {new Date().toLocaleString()}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table Layout */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Table Layout
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  getTableStatusColor(table.status)
                } ${selectedTable === table.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">{table.id}</div>
                  <div className="text-sm opacity-75">{table.capacity} seats</div>
                  <div className="text-xs mt-1 capitalize font-medium">{table.status}</div>
                  {table.order && (
                    <div className="text-xs mt-1 bg-white bg-opacity-50 rounded px-2 py-1">
                      {table.order}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Active Orders
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-lg">{order.id}</span>
                    <span className="text-gray-600">{order.table}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusColor(order.status)}`}>
                      {order.status.replace('-', ' ')}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Customer:</strong> {order.customer} | <strong>Time:</strong> {order.orderTime}
                </div>
                
                <div className="space-y-1 mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>{item.qty}x {item.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'ready' ? 'bg-green-100 text-green-800' :
                        item.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    {order.status === 'ready' && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Serve
                      </button>
                    )}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tables Occupied</p>
              <p className="text-2xl font-bold text-gray-900">3/6</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ready to Serve</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$96</p>
            </div>
            <AlertCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterInterface;