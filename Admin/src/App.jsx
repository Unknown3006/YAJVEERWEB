import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPass from "./components/ForgotPass";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingAnimation from "./components/LoadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { Fectchdata } from "./Redux/CartSlice";
import { fectchdata } from "./Redux/Reviews";
import { contactdata } from "./Redux/Contactus";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  
  const {
    loading: cartLoading,
    error: cartError
  } = useSelector((state) => state.cart);

  const {
    loading: reviewLoading,
    error: reviewError
  } = useSelector((state) => state.reviews);

  const {
     loading : contactusLoading,
     error : contactusError
  } = useSelector((state) => state.contactus);

  useEffect(() => {
    dispatch(Fectchdata());
    dispatch(fectchdata());
    dispatch(contactdata());
  }, [dispatch]);


  if (cartLoading || reviewLoading || contactusLoading) {
    return <LoadingAnimation />;
  }

  if (cartError || reviewError || contactusError) {
    return (
      <div className="error-container">
        <h2>Error Loading Data</h2>
        <p>{cartError || reviewError}</p>
        <button
          onClick={() => {
            dispatch(Fectchdata());
            dispatch(fectchdata());
          }}
        >
          Retry
        </button>
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
