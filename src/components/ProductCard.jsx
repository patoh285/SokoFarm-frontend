const ProductCard = ({ product, onOrder }) => {
  const isAvailable = product.status === 'available';

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
            {product.image_url && (
  <img
    src={`http://localhost:5000${product.image_url}`}
    alt={product.name}
    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6, marginBottom: 10 }}
  />
)}
          <h3 style={{ margin: '0 0 4px' }}>{product.name}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
            {product.farmer_name} &middot; {product.farmer_location}
          </p>
        </div>
        <span style={{
          fontSize: 12,
          padding: '3px 8px',
          borderRadius: 6,
          background: isAvailable ? '#e6f4ea' : '#f1f1f1',
          color: isAvailable ? '#1a7f37' : '#888'
        }}>
          {isAvailable ? 'Available' : 'Sold out'}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10 }}>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 'bold' }}>
          KES {product.price} <span style={{ fontSize: 13, fontWeight: 'normal', color: '#666' }}>/ {product.unit}</span>
        </p>
        <p style={{ margin: 0, fontSize: 13, color: '#888' }}>
          {product.quantity_available} {product.unit} left
        </p>
      </div>

      <button
        onClick={() => onOrder(product)}
        disabled={!isAvailable}
        style={{ width: '100%', marginTop: 10, padding: 10 }}
      >
        {isAvailable ? 'Place order' : 'Sold out'}
      </button>
    </div>
  );
};

export default ProductCard;