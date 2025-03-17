import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingCart, LogOut, X, Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
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
      <nav className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md p-4 rounded-xl gap-4 relative">
        <h1 className="text-2xl font-bold">Male Fashion</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-xl w-full md:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-4 relative">
          {/* Wishlist Button */}
          <button onClick={() => { setWishlistOpen(!wishlistOpen); setCartOpen(false); }} className="relative">
            <Heart size={28} className="text-red-500" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Wishlist Popup */}
          {wishlistOpen && (
            <div className="absolute top-10 right-20 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Wishlist</h2>
                <button onClick={() => setWishlistOpen(false)}>
                  <X size={20} className="text-gray-500 hover:text-black" />
                </button>
              </div>
              {wishlist.length === 0 ? (
                <p className="text-gray-500">No items in wishlist</p>
              ) : (
                <ul>
                  {wishlist.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b py-2">
                      <p className="text-sm font-medium">{item.title.slice(0, 15)}...</p>
                      <div className="flex items-center">
                        <p className="text-gray-600 text-sm mr-2">${item.price}</p>
                        <button onClick={() => removeFromWishlist(item.id)} className="text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Cart Button */}
          <button onClick={() => { setCartOpen(!cartOpen); setWishlistOpen(false); }} className="relative">
            <ShoppingCart size={28} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* Cart Popup */}
          {cartOpen && (
            <div className="absolute top-10 right-4 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Cart</h2>
                <button onClick={() => setCartOpen(false)}>
                  <X size={20} className="text-gray-500 hover:text-black" />
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <ul>
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                      <p className="text-sm font-medium">{item.title.slice(0, 15)}...</p>
                      <div className="flex items-center">
                        <p className="text-gray-600 text-sm mr-2">${item.price}</p>
                        <button onClick={() => removeFromCart(index)} className="text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <button onClick={handleCheckout} className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-700">
                Checkout
              </button>
            </div>
          )}

          {/* Logout */}
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <LogOut size={24} /> Logout
          </button>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <motion.div key={product.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-xl" />
            <h3 className="mt-4 text-lg font-bold">{product.title}</h3>
            <p className="text-gray-500">${product.price}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full hover:bg-blue-700">
                Add to Cart
              </button>
              <button onClick={() => addToWishlist(product)} className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700">
                <Heart size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

