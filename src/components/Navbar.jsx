import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cart }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Home
        </button>
        <div className='text-white text-xl font-bold'>
          E-Shopping
        </div>
        <button
          onClick={() => navigate("/cart")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Cart ({totalItems})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
