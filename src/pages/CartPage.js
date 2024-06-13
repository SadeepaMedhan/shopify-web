import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, totalAmount } = useContext(CartContext);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-indigo-600">Continue Shopping</Link></p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4 p-4 border-b">
              <div className="flex items-center">
                <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800 transition">Remove</button>
            </div>
          ))}
          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold mb-4">Total: ${totalAmount.toFixed(2)}</h2>
            <Link to="/checkout" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
