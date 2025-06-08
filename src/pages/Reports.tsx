import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Clock, Download, Calendar } from 'lucide-react';

const Reports = () => {
  const salesData = [
    { name: 'Mon', restaurant: 1200, hotel: 800 },
    { name: 'Tue', restaurant: 1500, hotel: 1200 },
    { name: 'Wed', restaurant: 1800, hotel: 900 },
    { name: 'Thu', restaurant: 2200, hotel: 1500 },
    { name: 'Fri', restaurant: 2800, hotel: 2000 },
    { name: 'Sat', restaurant: 3200, hotel: 2500 },
    { name: 'Sun', restaurant: 2500, hotel: 1800 },
  ];

  const orderTypeData = [
    { name: 'Dine In', value: 45, color: '#3B82F6' },
    { name: 'Takeaway', value: 30, color: '#10B981' },
    { name: 'Delivery', value: 25, color: '#F59E0B' },
  ];

  const occupancyData = [
    { time: '6 AM', occupancy: 20 },
    { time: '9 AM', occupancy: 45 },
    { time: '12 PM', occupancy: 85 },
    { time: '3 PM', occupancy: 60 },
    { time: '6 PM', occupancy: 90 },
    { time: '9 PM', occupancy: 75 },
    { time: '12 AM', occupancy: 30 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">📊 Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$24,847</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last week
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">342</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <Users className="w-4 h-4 mr-1" />
                +8% from last week
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Prep Time</p>
              <p className="text-3xl font-bold text-gray-900">18m</p>
              <p className="text-sm text-orange-600 flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1" />
                -2m from target
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hotel Occupancy</p>
              <p className="text-3xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-purple-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5% from last week
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="restaurant" fill="#3B82F6" name="Restaurant" />
              <Bar dataKey="hotel" fill="#10B981" name="Hotel" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Types */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Types Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Table Occupancy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Table Occupancy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="occupancy" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Items</h2>
          <div className="space-y-4">
            {[
              { name: 'Grilled Chicken', orders: 45, revenue: '$1,125' },
              { name: 'Pasta Carbonara', orders: 38, revenue: '$722' },
              { name: 'Caesar Salad', orders: 32, revenue: '$416' },
              { name: 'Fish & Chips', orders: 28, revenue: '$644' },
              { name: 'Burger Deluxe', orders: 25, revenue: '$475' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{item.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { time: '2 min ago', action: 'Order ORD-045 completed for Table T-05', type: 'order' },
            { time: '5 min ago', action: 'Room 203 checked out - Guest: Mike Wilson', type: 'hotel' },
            { time: '8 min ago', action: 'New reservation for Table T-03 at 7:00 PM', type: 'reservation' },
            { time: '12 min ago', action: 'Kitchen marked Order ORD-044 as ready', type: 'kitchen' },
            { time: '15 min ago', action: 'Room 105 booking confirmed - Guest: Emma Davis', type: 'hotel' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'order' ? 'bg-blue-500' :
                activity.type === 'hotel' ? 'bg-purple-500' :
                activity.type === 'reservation' ? 'bg-green-500' :
                'bg-orange-500'
              }`}></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">{activity.action}</div>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;