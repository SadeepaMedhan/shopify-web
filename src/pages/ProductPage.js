import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import CartContext from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto my-8">
      <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover mb-4" />
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 text-xl mb-4">${product.price}</p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;