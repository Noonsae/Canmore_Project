import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import Layout from "../components/Layout";



const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/Home" element={<Layout><HomePage/></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;