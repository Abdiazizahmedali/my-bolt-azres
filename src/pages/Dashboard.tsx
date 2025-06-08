import React from 'react';
import { BarChart3, Users, Clock, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Restaurant & Hotel Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Orders</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from yesterday
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tables</p>
              <p className="text-3xl font-bold text-gray-900">8/12</p>
              <p className="text-sm text-orange-600 flex items-center mt-1">
                <Users className="w-4 h-4 mr-1" />
                67% occupancy
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Prep Time</p>
              <p className="text-3xl font-bold text-gray-900">18m</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1" />
                -3m from target
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$2,847</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <DollarSign className="w-4 h-4 mr-1" />
                +8% from yesterday
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-left">
              <div className="text-blue-600 font-medium">New Order</div>
              <div className="text-sm text-gray-600">Create a new order</div>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-left">
              <div className="text-green-600 font-medium">Table Status</div>
              <div className="text-sm text-gray-600">View table layout</div>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 text-left">
              <div className="text-orange-600 font-medium">Kitchen Display</div>
              <div className="text-sm text-gray-600">View kitchen orders</div>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-left">
              <div className="text-purple-600 font-medium">Reports</div>
              <div className="text-sm text-gray-600">View analytics</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {[
              { id: 'ORD-001', table: 'T-05', status: 'In Progress', time: '2 min ago' },
              { id: 'ORD-002', table: 'T-03', status: 'Ready', time: '5 min ago' },
              { id: 'ORD-003', table: 'Takeaway', status: 'Completed', time: '8 min ago' },
              { id: 'ORD-004', table: 'T-07', status: 'Pending', time: '12 min ago' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="font-medium text-gray-900">{order.id}</div>
                  <div className="text-sm text-gray-600">{order.table}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Ready' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                  <div className="text-sm text-gray-500">{order.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;