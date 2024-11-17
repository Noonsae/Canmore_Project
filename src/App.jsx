import React from "react";
import Provider from "./context/Provider";
import Router from "./shared/Router";
// import Reset from "react"
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const App = () => {

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  // supabase 클라이언트 생성
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  return (
    <Provider>
      <Router />
      {/* {Reset} 연결하면 오류 생김.. 아시는 분 수정해주세요ㅠㅠ */}
    </Provider>
  );
};

export default App;
