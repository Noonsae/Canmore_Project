import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import Home from "../pages/Home";


const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Routs */}
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;