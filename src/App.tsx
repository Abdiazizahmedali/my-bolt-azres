import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KitchenDisplay from './pages/KitchenDisplay';
import OrderStatus from './pages/OrderStatus';
import WaiterInterface from './pages/WaiterInterface';
import OrderManagement from './pages/OrderManagement';
import TableManagement from './pages/TableManagement';
import MenuManagement from './pages/MenuManagement';
import HotelManagement from './pages/HotelManagement';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kitchen" element={<KitchenDisplay />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/waiter" element={<WaiterInterface />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/tables" element={<TableManagement />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/hotel" element={<HotelManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;