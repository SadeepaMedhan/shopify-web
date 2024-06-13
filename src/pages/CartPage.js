import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, totalAmount } = useContext(CartContext);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-indigo-600">Continue Shopping</Link></p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.product._id} className="flex justify-between items-center mb-4 p-4 border-b">
              <div>
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p>${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.product._id)} className="text-red-600">Remove</button>
            </div>
          ))}
          <div className="text-right">
            <h2 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
            <Link to="/checkout" className="bg-indigo-600 text-white px-4 py-2 rounded mt-4 inline-block">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
