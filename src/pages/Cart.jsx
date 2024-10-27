import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cart.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = totalAmount * 0.1;
  const finalAmount = totalAmount - discount;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                  <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                  <p className="text-sm font-bold text-gray-800">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t mt-6 pt-4">
              <h3 className="text-xl font-bold text-gray-800">Total Amount: ${(totalAmount).toFixed(2)}</h3>
              <h3 className="text-xl font-bold text-gray-800">Discount (10%): -${discount.toFixed(2)}</h3>
              <h3 className="text-xl font-bold text-gray-800">Final Amount: ${finalAmount.toFixed(2)}</h3>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Continue Shopping
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
