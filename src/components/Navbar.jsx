import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ fontWeight: 'bold', fontSize: 18, textDecoration: 'none', color: '#000' }}>
        SokoFarm
      </Link>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {!user && (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && user.role === 'buyer' && (
          <>
            <Link to="/browse">Browse</Link>
            <Link to="/my-orders">My orders</Link>
          </>
        )}

        {user && user.role === 'farmer' && (
          <>
            <Link to="/farmer-dashboard">My products</Link>
            <Link to="/farmer-orders">Orders</Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} style={{ padding: '6px 12px' }}>
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;