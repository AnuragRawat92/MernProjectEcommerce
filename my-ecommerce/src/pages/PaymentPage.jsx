import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], totalPrice = 0 } = location.state || {}; // Access state from location
  const [loading, setLoading] = useState(false);

  // Convert total price to Indian Rupees
  const totalPriceINR = (totalPrice * 83).toFixed(2);

  // Remove item from cart
  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    // Since cart is passed via state, you can't directly modify it here.
    // You might need to lift the state up or use a global state management solution.
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    setLoading(true);

    try {
      const amountInPaise = totalPriceINR * 100;
 const url="https://mernprojectecommerce-backend.onrender.com"
      const { data } = await axios.post(url + "/api/payment/orders", {
        amount: amountInPaise,
      });

      const options = {
        key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Payment for products",
        order_id: data.id,
        handler: async (response) => {
          try {
            const { data: verificationData } = await axios.post(url+
              "/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            alert("Payment successful!");
            navigate("/dashboard");
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log("Razorpay Key ID:", import.meta.env.REACT_APP_RAZORPAY_KEY_ID);
      console.error("Payment error:", error.response?.data || error.message);
      alert("Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Back to Dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition duration-300"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      {/* Payment Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Payment</h1>

      {/* Cart Items */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-6">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500">₹{(item.price * 83).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {/* Total Price */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-xl font-bold text-gray-800">
                Total: <span className="text-green-600">₹{totalPriceINR}</span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Payment Options */}
      <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Payment Method</h2>
        <div className="space-y-4">
          <button
            onClick={handleRazorpayPayment}
            disabled={loading || cart.length === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Processing...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Pay via Razorpay"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
