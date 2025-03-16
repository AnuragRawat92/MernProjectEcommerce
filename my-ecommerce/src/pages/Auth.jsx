import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css";

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlert = (message) => {
    alert(message); // Restore the popup functionality
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return false;
      }
    }
    return true;
  };

  const handleLogin = async () => {
    const url="https://mernprojectecommerce-backend.onrender.com"
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await axios.post(url +
        "/api/auth/login",
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      showAlert("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      showAlert(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignup = async () => {
     const url="https://mernprojectecommerce-backend.onrender.com"
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await axios.post(url+
        "/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      setIsLogin(true);
      setError("");
      showAlert("Signup successful! Please log in.");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      showAlert(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
      <button className="back-home-btn" onClick={handleBackToHome}>
          ⬅ Back to Home
        </button>
        <h1 className="auth-heading">🔐 Welcome Back! Secure, Fast & Seamless Access</h1>
        <h3 className="auth-title">Shop smarter, faster, and safer—log in to unlock a world of endless possibilities!🚀</h3>
      </header>

      <div className="auth-container">
        <div className={`auth-slider ${!isLogin ? "auth-moveslider" : ""}`}></div>
        <div className="auth-btn">
          <button className="auth-login" onClick={() => setIsLogin(true)}>Login</button>
          <button className="auth-signup" onClick={() => setIsLogin(false)}>Signup</button>
        </div>

        <div className={`auth-form-section ${!isLogin ? "auth-form-section-move" : ""}`}>
          {error && <p className="auth-error">{error}</p>}

          {isLogin ? (
            <div className="auth-login-box">
              <input
                type="email"
                name="email"
                className="auth-ele"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                className="auth-ele"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="auth-clkbtn" onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          ) : (
            <div className="auth-signup-box">
              <input
                type="text"
                name="name"
                className="auth-ele"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="auth-ele"
                placeholder="youremail@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                className="auth-ele"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                className="auth-ele"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button className="auth-clkbtn" onClick={handleSignup} disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Auth;
