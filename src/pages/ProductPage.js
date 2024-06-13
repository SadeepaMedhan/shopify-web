import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  if (!product) return <div className="text-center text-2xl my-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 shadow-lg rounded-lg bg-white">
      <Link to="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={`http://localhost:5000/${product.imageUrl}`}
            alt={product.name}
            className="w-full h-96 object-cover mb-4 rounded"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 text-xl mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
