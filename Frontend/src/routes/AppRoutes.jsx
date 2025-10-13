import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../Pages/Home";
import UserLogin from "../Pages/auth/UserLogin";
import UserRegister from "../Pages/auth/UserRegister";
import FoodPartnerLogin from "../Pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../Pages/auth/FoodPartnerRegister";
import Navbar from "../Components/Navbar";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user/register" element={<UserRegister />} />
                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
                    <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
                </Routes>
        </BrowserRouter>
    )
}