import { useEffect, useState } from 'react';
import api from '../api/axios';

const statusColors = {
  pending: { bg: '#fff8e1', text: '#a67c00' },
  accepted: { bg: '#e6f4ea', text: '#1a7f37' },
  rejected: { bg: '#fce8e6', text: '#c5221f' },
  paid: { bg: '#e8f0fe', text: '#1967d2' },
  completed: { bg: '#e6f4ea', text: '#1a7f37' },
  cancelled: { bg: '#f1f1f1', text: '#888' }
};

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/farmer-orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (id) => {
    setMessage('');
    try {
      await api.put(`/orders/${id}/accept`);
      fetchOrders();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to accept order');
    }
  };

  const handleReject = async (id) => {
    setMessage('');
    try {
      await api.put(`/orders/${id}/reject`);
      fetchOrders();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reject order');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading orders...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '20px auto', padding: '0 16px' }}>
      <h2>Orders received</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => {
        const colors = statusColors[order.status] || statusColors.pending;
        return (
          <div key={order.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0 }}>{order.product_name}</h4>
              <span style={{ fontSize: 12, padding: '3px 8px', borderRadius: 6, background: colors.bg, color: colors.text }}>
                {order.status}
              </span>
            </div>
            <p style={{ margin: '6px 0', color: '#666', fontSize: 14 }}>
              {order.buyer_name} &middot; {order.quantity} units &middot; KES {order.total_amount}
            </p>

            {order.status === 'pending' && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => handleAccept(order.id)} style={{ flex: 1, padding: 8 }}>
                  Accept
                </button>
                <button onClick={() => handleReject(order.id)} style={{ flex: 1, padding: 8, color: '#c5221f' }}>
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FarmerOrders;