
import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/getAllProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const productListStyle = {
    maxWidth: '600px',
    margin: '20px auto',
  };

  const productStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
  };

  return (
    <div style={productListStyle}>
      <h2>Product List</h2>
      <ul style={{ padding: 0 }}>
        {products.map(product => (
          <li key={product._id} style={productStyle}>
            <h3>{product.name}</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {product.variants.map(variant => (
                <li key={variant._id}>
                  {variant.name} - {variant.status}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
