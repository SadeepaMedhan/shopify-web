import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' means no filter
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/latest-products');
        setLatestProducts(response.data);
        setSortedProducts(response.data); // Initialize sorted products with latest products
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchLatestProducts(); // Call the function to fetch latest products when component mounts
  }, []); // Empty dependency array means this effect runs only once, on component mount

  // Calculate total quantity of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Function to handle sorting by price
  const handleSortByPrice = (sortOrder) => {
    const sorted = [...latestProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedProducts(sorted);
  };

  // Function to handle category filter
  const handleFilterByCategory = (category) => {
    if (category === 'all') {
      setSortedProducts(latestProducts);
    } else {
      const filtered = latestProducts.filter(product => product.category === category);
      setSortedProducts(filtered);
    }
    setFilterCategory(category);
  };

  return (
    <div className="container mx-auto py-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="btn-nav">
            Dashboard
          </Link>
          <Link to="/cart" className="btn-nav relative">
            Cart {totalItemsInCart > 0 && <span className="badge">{totalItemsInCart}</span>}
          </Link>
          <Link to="/orders" className="btn-nav">
            Order History
          </Link>
          <Link to="/signin" className="btn-nav btn-signin">
            Sign In
          </Link>
          <Link to="/signup" className="btn-nav btn-signup">
            Sign Up
          </Link>
        </div>
      </nav>
      <hr></hr>
      {/* Filter and Sort Controls */}
      <div className="mb-3 flex items-center space-x-4">
        <div>
          <label className="text-gray-700 font-medium">Sort by Price:</label>
          <div className="flex items-center space-x-2 mt-1">
            <button
              onClick={() => handleSortByPrice('asc')}
              className="btn-primary small-btn"
            >
              Low to High
            </button>
            <button
              onClick={() => handleSortByPrice('desc')}
              className="btn-primary small-btn"
            >
              High to Low
            </button>
          </div>
        </div>
       
        <div>
          <label className="text-gray-700 font-medium">Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => handleFilterByCategory(e.target.value)}
            className="form-select block w-full mt-1"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
      </div>
      <hr></hr>
      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {sortedProducts.map(product => (
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
