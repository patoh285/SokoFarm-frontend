import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import ProductDetail from './pages/ProductDetail';
import MyOrders from './pages/MyOrders';
import FarmerDashboard from './pages/FarmerDashboard';
import AddProduct from './pages/AddProduct';
import FarmerOrders from './pages/FarmerOrders';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
  path="/my-orders"
  element={
    <ProtectedRoute allowedRole="buyer">
      <MyOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/farmer-orders"
  element={
    <ProtectedRoute allowedRole="farmer">
      <FarmerOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/farmer-dashboard"
  element={
    <ProtectedRoute allowedRole="farmer">
      <FarmerDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/add-product"
  element={
    <ProtectedRoute allowedRole="farmer">
      <AddProduct />
    </ProtectedRoute>
  }
/>
        <Route
  path="/product/:id"
  element={
    <ProtectedRoute allowedRole="buyer">
      <ProductDetail />
    </ProtectedRoute>
  }
/>
        <Route
          path="/browse"
          element={
            <ProtectedRoute allowedRole="buyer">
              <Browse />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;