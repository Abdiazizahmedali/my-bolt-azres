import React from 'react';
import { Plus, Edit, Trash2, Search, Filter, ChefHat } from 'lucide-react';

const MenuManagement = () => {
  const menuItems = [
    { id: 1, name: 'Grilled Chicken', category: 'Main Course', price: 24.99, prepTime: 15, available: true },
    { id: 2, name: 'Caesar Salad', category: 'Appetizers', price: 12.99, prepTime: 5, available: true },
    { id: 3, name: 'Pasta Carbonara', category: 'Main Course', price: 18.99, prepTime: 12, available: true },
    { id: 4, name: 'Fish & Chips', category: 'Main Course', price: 22.99, prepTime: 18, available: false },
    { id: 5, name: 'Chocolate Cake', category: 'Desserts', price: 8.99, prepTime: 3, available: true },
    { id: 6, name: 'Coffee', category: 'Beverages', price: 3.99, prepTime: 2, available: true },
  ];

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <ChefHat className="w-4 h-4 mr-1" />
                      {item.prepTime} min
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.available ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${item.price}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  item.available 
                    ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}>
                  {item.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.slice(1).map((category) => {
          const count = menuItems.filter(item => item.category === category).length;
          const available = menuItems.filter(item => item.category === category && item.available).length;
          
          return (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-center">
                <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
                <div className="text-sm text-gray-600">{available} available</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuManagement;