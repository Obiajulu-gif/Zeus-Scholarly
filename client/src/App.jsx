import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Replace Redirect with Navigate
import MainHeader from "./components/MainHeader";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ProductDetail from "./pages/ProductDetail";
import "./index.css";

const App = () => {
    return (
        <div>
            <MainHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/emma" element={<Navigate to="/about" replace />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
        </div>
    );
};
export default App;