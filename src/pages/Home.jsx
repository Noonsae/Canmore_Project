import React from 'react';
import supabase from '../supabase/supabase';

const Home = () => {
  const signOutUser = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log('signout: ', { data, error });
  };

  return (
    <div>
      <p>Home</p>
      <button onClick={signOutUser}>로그아웃</button>
    </div>
  );
};

export default Home;
