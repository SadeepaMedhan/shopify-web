import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);

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

  // Calculate total quantity of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mx-auto py-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="btn-nav"
          >
            Dashboard
          </Link>
          <Link
            to="/cart"
            className="btn-nav relative"
          >
            Cart {totalItemsInCart > 0 && <span className="badge">{totalItemsInCart}</span>}
          </Link>
          <Link
            to="/orders"
            className="btn-nav"
          >
            Order History
          </Link>
          <Link
            to="/signin"
            className="btn-nav btn-signin"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="btn-nav btn-signup"
          >
            Sign Up
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
              <p className="text-gray-800 font-bold">Rs.{product.price}</p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/product/${product._id}`}
                  className="btn-primary"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-secondary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
