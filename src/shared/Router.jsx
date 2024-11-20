import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';
import TimeLine from '../pages/TimeLine';
import FeedPage from '../pages/FeedPage';
import Layout from '../components/Layout';
import Bookmark from '../pages/Bookmark';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/FeedPage" element={<FeedPage />} />
      <Route path="/user/:id" element={<FeedPage />} />
      <Route
        path="/HomePage"
        element={
          <Layout>
            <HomePage/>
          </Layout>
        }
      />
      <Route path="/timeline" element={<TimeLine />} />
      <Route path="/write" element={<FeedPage />} />
      <Route path="/bookmark" element={<Bookmark />} />
    </Routes>
  </BrowserRouter>
);


export default Router;
