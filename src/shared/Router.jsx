import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import FeedPage from "../pages/FeedPage";
import TimeLine from "../pages/TimeLine";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/FeedPage" element={<FeedPage />} />
      <Route path="/HomePage" element={<Layout><HomePage /></Layout>}/>
      <Route path="/timeline" element={<TimeLine/>}/>
    </Routes>
  </BrowserRouter>
);

export default Router;
