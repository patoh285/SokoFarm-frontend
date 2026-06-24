import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', unit: '', quantity: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('price', form.price);
      data.append('unit', form.unit);
      data.append('quantity', form.quantity);
      if (image) data.append('image', image);

      await api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/farmer-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: '0 16px' }}>
      <h2>Add a new product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product name (e.g. Avocados)" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <textarea name="description" placeholder="Description" onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="price" type="number" placeholder="Price per unit (KES)" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="unit" placeholder="Unit (e.g. kg, crate, bag)" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="quantity" type="number" placeholder="Quantity available" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />

        <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Product photo</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ display: 'block', width: '100%', marginBottom: 10 }} />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{ width: '100%', padding: 10 }}>
          {submitting ? 'Adding...' : 'Add product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;