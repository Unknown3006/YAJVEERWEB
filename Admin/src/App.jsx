import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPass from "./components/ForgotPass";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingAnimation from "./components/LoadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { Fectchdata } from "./Redux/CartSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(Fectchdata());
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <button onClick={() => dispatch(Fectchdata())}>Retry</button>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/forgotPassword" element={<ForgotPass />} />
    </Routes>
  );
}

export default App;
