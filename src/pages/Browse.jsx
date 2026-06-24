import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Browse = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    navigate(`/product/${product.id}`);
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading products...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 500, margin: '20px auto', padding: '0 16px' }}>
      <h2>Browse produce</h2>
      {products.length === 0 && <p>No products available right now.</p>}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOrder={handleOrder} />
      ))}
    </div>
  );
};

export default Browse;