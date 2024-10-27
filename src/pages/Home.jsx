import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex === -1) {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    }
  };


  if (loading) return <div><h1 className='text-black text-xl font-bold text-center'>Loading...........</h1></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col h-full">
            <img src={product.image} alt={product.title} className="h-32 object-contain mb-4" />
            <h2 className="text-md font-semibold text-gray-800 text-center">{product.title}</h2>
            <div className="flex-grow" />
            <div className="border border-gray-300 rounded p-4 flex flex-col items-center">
              <p className="text-yellow-500">Rating: {product.rating.rate.toFixed(1)}</p>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
