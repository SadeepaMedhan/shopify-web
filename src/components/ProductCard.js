import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <Link to={`/product/${product._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded">View Details</Link>
    </div>
  );
};

export default ProductCard;
