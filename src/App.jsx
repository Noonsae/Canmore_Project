import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import { FeedProvider } from './context/FeedContext';
import { useEffect, useState } from 'react';
import supabase from './supabase/Supabase';

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData, error } = await supabase.auth.getUser(); // 로그인된 사용자 정보 가져오기

      if (error) {
        console.error('Error fetching user:', error);
        alert('로그인된 사용자를 확인할 수 없습니다.');
        return;
      }
      setUserId(authData.user.id || null);
    };

    fetchUser();
  }, []);

  return (
    <FeedProvider>
      <GlobalStyle />
      <Router userId={userId} /> {/* Router 컴포넌트가 이미 모든 경로를 처리 */}
    </FeedProvider>
  );
};

export default App;
