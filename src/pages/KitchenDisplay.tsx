import React from 'react';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';

const KitchenDisplay = () => {
  const orders = [
    {
      id: 'ORD-001',
      table: 'T-05',
      orderTime: '12:15 PM',
      status: 'pending',
      items: [
        { name: 'Grilled Chicken', qty: 2, notes: 'Extra spicy' },
        { name: 'Caesar Salad', qty: 1, notes: 'No croutons' },
        { name: 'Pasta Carbonara', qty: 1, notes: '' }
      ],
      specialInstructions: 'Customer has nut allergy'
    },
    {
      id: 'ORD-002',
      table: 'T-03',
      orderTime: '12:18 PM',
      status: 'in-progress',
      items: [
        { name: 'Fish & Chips', qty: 2, notes: '' },
        { name: 'Onion Rings', qty: 1, notes: 'Extra crispy' }
      ],
      specialInstructions: ''
    },
    {
      id: 'ORD-003',
      table: 'Takeaway',
      orderTime: '12:20 PM',
      status: 'ready',
      items: [
        { name: 'Burger Deluxe', qty: 1, notes: 'Medium rare' },
        { name: 'French Fries', qty: 1, notes: '' }
      ],
      specialInstructions: ''
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-500';
      case 'in-progress': return 'bg-orange-500';
      case 'ready': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'in-progress': return <ChefHat className="w-5 h-5" />;
      case 'ready': return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">🍳 Kitchen Display System</h1>
        <div className="text-center text-gray-400">
          {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="bg-red-600 text-white text-center py-3 rounded-lg mb-6 font-bold text-lg">
            📋 PENDING ORDERS
          </div>
          <div className="space-y-4">
            {orders.filter(order => order.status === 'pending').map(order => (
              <div key={order.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-lg">{order.id}</span>
                  <span className="text-gray-300">{order.orderTime}</span>
                </div>
                <div className="bg-gray-800 p-2 rounded mb-3">
                  <span className="font-medium">{order.table}</span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.notes && <div className="text-sm text-pink-300 italic">{item.notes}</div>}
                      </div>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
                {order.specialInstructions && (
                  <div className="bg-purple-800 p-3 rounded border-l-4 border-purple-500 mb-4">
                    <strong>Special Instructions:</strong><br />
                    {order.specialInstructions}
                  </div>
                )}
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-bold transition-colors">
                  Start Cooking
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Orders */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="bg-orange-600 text-white text-center py-3 rounded-lg mb-6 font-bold text-lg">
            👨‍🍳 IN PROGRESS
          </div>
          <div className="space-y-4">
            {orders.filter(order => order.status === 'in-progress').map(order => (
              <div key={order.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-lg">{order.id}</span>
                  <span className="text-gray-300">{order.orderTime}</span>
                </div>
                <div className="bg-gray-800 p-2 rounded mb-3">
                  <span className="font-medium">{order.table}</span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.notes && <div className="text-sm text-pink-300 italic">{item.notes}</div>}
                      </div>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold transition-colors">
                  Mark Ready
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ready Orders */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="bg-green-600 text-white text-center py-3 rounded-lg mb-6 font-bold text-lg">
            ✅ READY TO SERVE
          </div>
          <div className="space-y-4">
            {orders.filter(order => order.status === 'ready').map(order => (
              <div key={order.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-lg">{order.id}</span>
                  <span className="text-gray-300">{order.orderTime}</span>
                </div>
                <div className="bg-gray-800 p-2 rounded mb-3">
                  <span className="font-medium">{order.table}</span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.notes && <div className="text-sm text-pink-300 italic">{item.notes}</div>}
                      </div>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold transition-colors">
                  Served
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenDisplay;