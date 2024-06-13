import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, totalAmount, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // Simulate a successful payment
    alert('Payment successful!');
    clearCart();
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div>
        {cart.map(item => (
          <div key={item.product._id} className="flex justify-between items-center mb-4 p-4 border-b">
            <div>
              <h2 className="text-xl font-semibold">{item.product.name}</h2>
              <p>${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="text-right">
          <h2 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
          <button onClick={handleCheckout} className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
