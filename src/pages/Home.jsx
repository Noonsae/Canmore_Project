import React from 'react';
import supabase from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const handleLogOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log('signout: ', { data, error });
    useNavigate('/');
  };

  return (
    <div>
      <p>Home</p>
      <button onClick={handleLogOut}>로그아웃</button>
    </div>
  );
};

export default Home;
