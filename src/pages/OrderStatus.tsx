import React from 'react';
import { Clock, CheckCircle, Utensils, Package } from 'lucide-react';

const OrderStatus = () => {
  const orders = [
    {
      id: 'ORD-001',
      table: 'T-05',
      orderTime: '12:15 PM',
      estimatedTime: '12:35 PM',
      status: 'preparing',
      items: ['Grilled Chicken', 'Caesar Salad', 'Pasta Carbonara']
    },
    {
      id: 'ORD-002',
      table: 'T-03',
      orderTime: '12:18 PM',
      estimatedTime: '12:38 PM',
      status: 'preparing',
      items: ['Fish & Chips', 'Onion Rings']
    },
    {
      id: 'ORD-003',
      table: 'Takeaway',
      orderTime: '12:20 PM',
      estimatedTime: '12:40 PM',
      status: 'ready',
      items: ['Burger Deluxe', 'French Fries']
    },
    {
      id: 'ORD-004',
      table: 'T-07',
      orderTime: '12:22 PM',
      estimatedTime: '12:42 PM',
      status: 'received',
      items: ['Pizza Margherita', 'Garlic Bread']
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'received':
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-800',
          bgColor: 'bg-blue-50',
          icon: <Package className="w-6 h-6" />,
          text: 'Order Received'
        };
      case 'preparing':
        return {
          color: 'bg-orange-500',
          textColor: 'text-orange-800',
          bgColor: 'bg-orange-50',
          icon: <Utensils className="w-6 h-6" />,
          text: 'Being Prepared'
        };
      case 'ready':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-800',
          bgColor: 'bg-green-50',
          icon: <CheckCircle className="w-6 h-6" />,
          text: 'Ready for Pickup'
        };
      default:
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-800',
          bgColor: 'bg-gray-50',
          icon: <Clock className="w-6 h-6" />,
          text: 'Processing'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📱 Order Status Board</h1>
          <p className="text-gray-600">Track your order in real-time</p>
          <div className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div key={order.id} className={`${statusInfo.bgColor} rounded-2xl p-6 shadow-lg border-l-4 ${statusInfo.color} transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${statusInfo.color} text-white`}>
                      {statusInfo.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.table}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.textColor} ${statusInfo.bgColor} border`}>
                    {statusInfo.text}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order Time:</span>
                    <span className="font-medium text-gray-900">{order.orderTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Ready:</span>
                    <span className="font-medium text-gray-900">{order.estimatedTime}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Order Items:</h4>
                  <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {order.status === 'ready' && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Your order is ready!</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Received</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Preparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;