import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  // Fetch products from FakeStore API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 12))) // Show only first 12 products
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = () => {
    setShowLoginMessage(true);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">Latest Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl cursor-pointer transition duration-300"
            onClick={() => setSelectedProduct(product)}
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">{selectedProduct.title}</h3>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title} 
              className="w-full h-40 object-cover rounded-md"
            />
            <p className="text-gray-600 mt-2">${selectedProduct.price}</p>
            <p className="text-sm text-gray-500 mt-2">{selectedProduct.description}</p>
            <button 
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-bold hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              className="mt-2 w-full text-red-500 font-bold hover:text-red-700"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Login Message Modal */}
      {showLoginMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">Please Login</h3>
            <button 
              className="w-full bg-gray-500 text-white py-2 rounded-lg text-lg font-bold hover:bg-gray-700"
              onClick={() => setShowLoginMessage(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
