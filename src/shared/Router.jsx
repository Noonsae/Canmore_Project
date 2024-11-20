import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";


import LoginPage from "../pages/LoginPage";
import FeedPage from "../pages/FeedPage";
import TimeLine from "../pages/TimeLine";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/timeline" element={<TimeLine/>}/>
    </Routes>
  </BrowserRouter>
);



 

export default Router;
