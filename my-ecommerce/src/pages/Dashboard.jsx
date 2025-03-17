import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, LogOut, X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleCheckout = () => {
    navigate("/payment", { state: { cart, totalPrice } });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md p-4 rounded-xl gap-4">
        <h1 className="text-2xl font-bold">Male Fashion</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-xl w-full md:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <button onClick={() => setCartOpen(!cartOpen)} className="relative">
            <ShoppingCart size={28} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <LogOut size={24} /> Logout
          </button>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-xl" />
            <h3 className="mt-4 text-lg font-bold">{product.title}</h3>
            <p className="text-gray-500">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl w-full hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-xl p-6 overflow-y-auto z-50"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={() => setCartOpen(false)}><X size={24} /></button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 mt-4">Cart is empty.</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between mt-4 p-4 border rounded-lg">
                      <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg" />
                      <div className="flex-1 ml-4">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-500">${item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-lg font-bold">Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span></p>
                  </div>
                  <button onClick={clearCart} className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-700">
                    Clear Cart
                  </button>
                  <button onClick={handleCheckout} className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-700">
                    Checkout
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
