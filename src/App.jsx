import React from "react";
import Provider from "./context/Provider";
import Router from "./shared/Router";
// import Reset from "react"
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const App = () => {

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  dotenv.config();
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  return (
    <Provider>
      <Router />
      {/* {Reset} */}
    </Provider>
  );
};

export default App;
