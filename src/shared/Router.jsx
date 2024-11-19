import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import FeedPage from "../pages/FeedPage";
import Home from "../pages/Home";
import TimeLine from "../pages/TimeLine";
import Layout from "../components/Layout";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/FeedPage" element={<FeedPage />} />
      <Route path="/" element={<Layout><Home /></Layout>}/>
      <Route path="/timeline" element={<TimeLine/>}/>
      <Route path="/write" element={<FeedPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
