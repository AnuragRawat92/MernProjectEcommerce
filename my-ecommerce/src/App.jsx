import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PaymentPage from "./pages/PaymentPage"; // Import PaymentPage

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Auth setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* PaymentPage Route */}
        <Route path="/payment" element={<PaymentPage />} />
        

        {/* Redirect to Home for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;