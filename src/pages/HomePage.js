import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/latest-products');
        setLatestProducts(response.data);
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchLatestProducts(); // Call the function to fetch latest products when component mounts
  }, []); // Empty dependency array means this effect runs only once, on component mount

  return (
    <div className="container mx-auto py-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
        <div>
          <Link
            to="/admin"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Dashboard
          </Link>
          <Link
            to="/cart"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Order History
          </Link>
        </div>
      </nav>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`http://localhost:5000/${product.imageUrl}`}
              alt={product.name}
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-800 font-bold">${product.price}</p>
              <Link
                to={`/product/${product._id}`}
                className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
