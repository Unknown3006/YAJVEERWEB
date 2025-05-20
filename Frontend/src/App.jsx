import React from 'react'
import reactDom from "react-dom/client";
import Login from './components/login';
import { Routes, Route } from 'react-router';
import ScrollToTop from "./components/ScrollToTop";
import Home from './components/home';
import SignUp from './components/signup';
import ReviewForm from './components/ReviewForm';
import ProductDetails from './components/ProductDetails';
import AboutUs from './components/AboutUs';
import Policies from './components/Footer/Policies';

const App = () => {
  return (
        <>
          <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/signUp' element={<SignUp></SignUp>}></Route>
            <Route path="/reviewForm" element={<ReviewForm></ReviewForm>}></Route>
            <Route path="/product/:id" element={<ProductDetails></ProductDetails>}></Route>
            <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
            <Route path="/policies" element={<Policies></Policies>}></Route>
        </Routes>
        </>
    )
}

export default App