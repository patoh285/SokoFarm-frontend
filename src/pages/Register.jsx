import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', role: 'buyer', location: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '60px auto' }}>
      <h2>Create your SokoFarm account</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full name" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="phone" placeholder="Phone" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="location" placeholder="Location (e.g. Karatina)" onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <select name="role" onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}>
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: 10 }}>Register</button>
      </form>
    </div>
  );
};

export default Register;