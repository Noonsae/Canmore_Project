


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import Homepage from '../pages/Homepage';
import TimeLine from '../pages/TimeLine';
import FeedPage from '../pages/FeedPage';
import Layout from '../components/Layout';
import Bookmark from '../pages/Bookmark';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/FeedPage" element={<FeedPage />} />
      <Route path="/user/:id" element={<FeedPage />} />
      <Route
        path="/home"
        element={
          <Layout>
            <Homepage />
          </Layout>
        }
      />
      <Route path="/timeline" element={<TimeLine />} />
      <Route path="/write" element={<FeedPage />} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="/reset" element={<ResetPasswordPage />} />
    </Routes>
  </BrowserRouter>
);



 

export default Router;
