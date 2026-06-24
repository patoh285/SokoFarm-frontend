import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/my-products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '20px auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My products</h2>
        <Link to="/add-product">
          <button style={{ padding: '8px 14px' }}>+ Add product</button>
        </Link>
      </div>

      {products.length === 0 && <p>You haven't listed any products yet.</p>}

      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {product.image_url && (
              <img
                src={`https://elude-prevail-breeches.ngrok-free.dev ->${product.image_url}`}
                alt={product.name}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px' }}>{product.name}</h4>
              <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
                KES {product.price} / {product.unit} &middot; {product.quantity_available} {product.unit} left
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: product.status === 'available' ? '#1a7f37' : '#888' }}>
                {product.status}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(product.id)}
            style={{ width: '100%', marginTop: 10, padding: 8, color: '#c5221f' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FarmerDashboard;