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

const MyOrders = () => {
 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/my-orders');
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

  const handlePay = async (orderId) => {
    setMessage('');
    try {
      await api.post('/payments/initiate', { orderId, phoneNumber: phone });
      setMessage('STK push sent, check your phone to complete payment.');
      setPayingId(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Payment failed to initiate');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading orders...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '20px auto', padding: '0 16px' }}>
      <h2>My orders</h2>
      {message && <p style={{ color: '#1967d2' }}>{message}</p>}
      {orders.length === 0 && <p>You haven't placed any orders yet.</p>}

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
              {order.farmer_name} &middot; {order.quantity} units &middot; KES {order.total_amount}
            </p>

            {order.status === 'accepted' && (
              payingId === order.id ? (
                <div style={{ marginTop: 8 }}>
                  <input
                    type="text"
                    placeholder="2547XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: 8, marginBottom: 6 }}
                  />
                  <button onClick={() => handlePay(order.id)} style={{ width: '100%', padding: 8 }}>
                    Send payment request
                  </button>
                </div>
              ) : (
                <button onClick={() => setPayingId(order.id)} style={{ width: '100%', padding: 8, marginTop: 6 }}>
                  Pay now
                </button>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;