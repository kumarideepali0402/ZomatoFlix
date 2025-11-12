// import React from "react";
// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Home from "../Pages/General/Home";
// import UserLogin from "../Pages/auth/UserLogin";
// import UserRegister from "../Pages/auth/UserRegister";
// import FoodPartnerLogin from "../Pages/auth/FoodPartnerLogin";
// import FoodPartnerRegister from "../Pages/auth/FoodPartnerRegister";
// import Navbar from "../Components/Navbar";
// import CreateFood from "../Pages/foodPartner/CreateFoodPartner";
// import ReelFeed from "../components/ReelFeed";
// import Profile from "../Pages/foodPartner/Profile";
// export default function AppRoutes(){
//     return(
//         <BrowserRouter>
            
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/user/register" element={<UserRegister />} />
//                     <Route path="/user/login" element={<UserLogin />} />
//                     <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
//                     <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
//                     <Route path="/createFood" element={<CreateFood/>}/>
//                     <Route path="/reel" element={<ReelFeed/>}></Route>
//                     <Route path="/food-partner/:id" element={<Profile />} />
//                 </Routes>
//         </BrowserRouter>
//     )
// }


import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../Pages/General/Home";
import UserLogin from "../Pages/auth/UserLogin";
import UserRegister from "../Pages/auth/UserRegister";
import FoodPartnerLogin from "../Pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../Pages/auth/FoodPartnerRegister";
import CreateFood from "../Pages/foodPartner/CreateFood";
import ReelFeed from "../Components/reelFeed"; // 🔧 FIXED: Correct import path
import Profile from "../Pages/foodPartner/Profile";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
                <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
                <Route path="/createFood" element={<CreateFood/>}/>
                <Route path="/reel" element={<ReelFeed/>}></Route>
                <Route path="/food-partner/:id" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}