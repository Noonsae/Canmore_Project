import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import LoginPage from '../pages/LoginPage';
import FeedPage from '../pages/FeedPage';
import TimeLine from '../pages/TimeLine';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/FeedPage" element={<FeedPage />} />
      <Route
        path="/Home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/timeline" element={<TimeLine />} />
      <Route path="/user/:id" element={<FeedPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
