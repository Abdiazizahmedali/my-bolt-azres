import React from 'react';
import { Users, Plus, Edit, Trash2, MapPin } from 'lucide-react';

const TableManagement = () => {
  const tables = [
    { id: 'T-01', capacity: 2, status: 'available', floor: 'Ground Floor', section: 'Window' },
    { id: 'T-02', capacity: 4, status: 'occupied', floor: 'Ground Floor', section: 'Center' },
    { id: 'T-03', capacity: 6, status: 'occupied', floor: 'Ground Floor', section: 'Corner' },
    { id: 'T-04', capacity: 2, status: 'reserved', floor: 'First Floor', section: 'Balcony' },
    { id: 'T-05', capacity: 4, status: 'occupied', floor: 'First Floor', section: 'Center' },
    { id: 'T-06', capacity: 8, status: 'available', floor: 'First Floor', section: 'Private' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-service': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Table Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Table</span>
        </button>
      </div>

      {/* Table Layout View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Floor Plan
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ground Floor */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Ground Floor</h3>
            <div className="relative bg-gray-50 rounded-lg p-4 h-64">
              <div className="grid grid-cols-3 gap-4 h-full">
                {tables.filter(table => table.floor === 'Ground Floor').map((table) => (
                  <div
                    key={table.id}
                    className={`flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      table.status === 'available' ? 'bg-green-100 border-green-300 text-green-800' :
                      table.status === 'occupied' ? 'bg-red-100 border-red-300 text-red-800' :
                      table.status === 'reserved' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                      'bg-gray-100 border-gray-300 text-gray-800'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold">{table.id}</div>
                      <div className="text-xs">{table.capacity} seats</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* First Floor */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">First Floor</h3>
            <div className="relative bg-gray-50 rounded-lg p-4 h-64">
              <div className="grid grid-cols-3 gap-4 h-full">
                {tables.filter(table => table.floor === 'First Floor').map((table) => (
                  <div
                    key={table.id}
                    className={`flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      table.status === 'available' ? 'bg-green-100 border-green-300 text-green-800' :
                      table.status === 'occupied' ? 'bg-red-100 border-red-300 text-red-800' :
                      table.status === 'reserved' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                      'bg-gray-100 border-gray-300 text-gray-800'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold">{table.id}</div>
                      <div className="text-xs">{table.capacity} seats</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Table Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Table ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Capacity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Floor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Section</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{table.id}</td>
                  <td className="py-3 px-4 text-gray-600">{table.capacity} seats</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(table.status)}`}>
                      {table.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{table.floor}</td>
                  <td className="py-3 px-4 text-gray-600">{table.section}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tables</p>
              <p className="text-2xl font-bold text-gray-900">{tables.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">
                {tables.filter(t => t.status === 'available').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-red-600">
                {tables.filter(t => t.status === 'occupied').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reserved</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tables.filter(t => t.status === 'reserved').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;