import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';
import TimeLine from '../pages/TimeLine';
import FeedPage from '../pages/FeedPage';
import Layout from '../components/Layout';
import UserFeedPage from '../pages/UsersFeedPage';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/FeedPage" element={<FeedPage />} />
      <Route path="/user/:id" element={<UserFeedPage />} />
      <Route
        path="/HomePage"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/timeline" element={<TimeLine />} />
      <Route path="/write" element={<FeedPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
