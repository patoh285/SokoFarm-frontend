import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get('/products');
        const found = res.data.find((p) => p.id === parseInt(id));
        setProduct(found);
      } catch (err) {
        setError('Failed to load product');
      }
    };
    fetchProduct();
  }, [id]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const res = await api.post('/orders', {
        productId: parseInt(id),
        quantity: parseFloat(quantity)
      });
      setSuccess(`Order placed! Total: KES ${res.data.totalAmount}`);
      setTimeout(() => navigate('/my-orders'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: '0 16px' }}>
      <h2>{product.name}</h2>
      <p style={{ color: '#666' }}>{product.farmer_name} &middot; {product.farmer_location}</p>
      <p>{product.description}</p>

      <p style={{ fontSize: 20, fontWeight: 'bold' }}>
        KES {product.price} <span style={{ fontSize: 14, fontWeight: 'normal', color: '#666' }}>/ {product.unit}</span>
      </p>
      <p style={{ color: '#888' }}>{product.quantity_available} {product.unit} available</p>

      <form onSubmit={handlePlaceOrder} style={{ marginTop: 20 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>
          Quantity ({product.unit})
        </label>
        <input
          type="number"
          min="0.5"
          step="0.5"
          max={product.quantity_available}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <p style={{ fontWeight: 'bold' }}>
          Total: KES {(quantity * product.price).toFixed(2)}
        </p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit" disabled={submitting} style={{ width: '100%', padding: 10 }}>
          {submitting ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;