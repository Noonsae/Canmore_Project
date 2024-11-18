import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const Supabase = () => {
  // supabase 클라이언트 생성
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('our_table').select('*');
      if (error) console.error('Error fetching data:', error);
      else setData(data);
    };

    fetchData();
  }, []);
};

export default Supabase;
