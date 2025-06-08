import React from 'react';
import { Bed, Users, Calendar, DollarSign, Plus, Eye, Edit } from 'lucide-react';

const HotelManagement = () => {
  const rooms = [
    { id: '101', type: 'Standard', capacity: 2, status: 'available', rate: 120, guest: null },
    { id: '102', type: 'Deluxe', capacity: 2, status: 'occupied', rate: 180, guest: 'John Smith' },
    { id: '103', type: 'Suite', capacity: 4, status: 'occupied', rate: 300, guest: 'Sarah Johnson' },
    { id: '201', type: 'Standard', capacity: 2, status: 'maintenance', rate: 120, guest: null },
    { id: '202', type: 'Family', capacity: 6, status: 'available', rate: 250, guest: null },
    { id: '203', type: 'Deluxe', capacity: 2, status: 'reserved', rate: 180, guest: 'Mike Wilson' },
  ];

  const bookings = [
    { id: 'BK-001', guest: 'John Smith', room: '102', checkIn: '2024-01-15', checkOut: '2024-01-18', status: 'checked-in' },
    { id: 'BK-002', guest: 'Sarah Johnson', room: '103', checkIn: '2024-01-16', checkOut: '2024-01-20', status: 'checked-in' },
    { id: 'BK-003', guest: 'Mike Wilson', room: '203', checkIn: '2024-01-17', checkOut: '2024-01-19', status: 'confirmed' },
    { id: 'BK-004', guest: 'Emma Davis', room: '105', checkIn: '2024-01-18', checkOut: '2024-01-22', status: 'pending' },
  ];

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 border-green-300 text-green-800';
      case 'occupied': return 'bg-red-100 border-red-300 text-red-800';
      case 'reserved': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'maintenance': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'checked-in': return 'bg-green-100 text-green-800';
      case 'checked-out': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">🏨 Hotel Management</h1>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Room</span>
          </button>
        </div>
      </div>

      {/* Hotel Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-3xl font-bold text-gray-900">{rooms.length}</p>
              <p className="text-sm text-blue-600 mt-1">6 floors</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Bed className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900">67%</p>
              <p className="text-sm text-green-600 mt-1">+5% from last week</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-orange-600 mt-1">2 pending arrivals</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Today</p>
              <p className="text-3xl font-bold text-gray-900">$1,240</p>
              <p className="text-sm text-purple-600 mt-1">$8,680 this week</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bed className="w-5 h-5 mr-2" />
            Room Status
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${getRoomStatusColor(room.status)}`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">{room.id}</div>
                  <div className="text-sm opacity-75">{room.type}</div>
                  <div className="text-xs mt-1">{room.capacity} guests</div>
                  <div className="text-xs font-medium mt-1">${room.rate}/night</div>
                  {room.guest && (
                    <div className="text-xs mt-1 bg-white bg-opacity-50 rounded px-2 py-1">
                      {room.guest}
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
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Maintenance</span>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Recent Bookings
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold">{booking.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBookingStatusColor(booking.status)}`}>
                      {booking.status.replace('-', ' ')}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Guest:</strong> {booking.guest}</div>
                  <div><strong>Room:</strong> {booking.room}</div>
                  <div><strong>Check-in:</strong> {booking.checkIn}</div>
                  <div><strong>Check-out:</strong> {booking.checkOut}</div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  {booking.status === 'confirmed' && (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Check In
                    </button>
                  )}
                  {booking.status === 'checked-in' && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Check Out
                    </button>
                  )}
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelManagement;