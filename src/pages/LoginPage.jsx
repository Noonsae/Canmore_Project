import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase';
import Home from './Home';

const LoginPage = () => {
  // 이메일과 비밀번호 입력 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 현재 사용자 세션 관리
  const [user, setUser] = useState(null);

  // React Router의 내비게이션 훅
  const navigate = useNavigate();

  // 이메일 입력 필드 변경 이벤트 핸들러
  const onChangeEmail = (e) => {
    // 현재 입력값으로 이메일 상태를 업데이트
    setEmail(e.target.value);
  };

  // 비밀번호 입력 필드 변경 이벤트 핸들러
  const onChangePassword = (e) => {
    // 현재 입력값으로 비밀번호 상태를 업데이트
    setPassword(e.target.value);
  };

  // 인증 상태 변화를 감지
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      // 세션 상태에 따라 사용자 상태 업데이트
      setUser(session ? session.user : null);
    });

    return () => {
      // 컴포넌트 언마운트 시 구독 해제
      subscription.unsubscribe();
    };
  }, []);

  // 로그인 처리 함수
  const signInUser = async (e) => {
    // 버튼의 기본 동작(re-load) 방지
    e.preventDefault(); 
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // 오류 메시지를 콘솔에 출력
      console.error('로그인 오류:', error.message);
    } else {
      // 성공 메시지를 콘솔에 출력
      console.log('로그인 성공:', data); 
      // 로그인된 사용자 상태로 업데이트
      setUser(data.user); 
    }
  };

  // 회원가입 페이지로 이동
  const goToSignUp = () => {
    // 회원가입 경로로 이동
    navigate('/sign-up'); 
  };

  // 로그인되지 않은 상태에서의 렌더링
  if (!user) {
    return (
      <div className="login-container">
        <h1>로그인 페이지</h1>
        <form>
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={onChangeEmail}
            required
          />
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={onChangePassword}
            required
          />
          <button type="button" onClick={signInUser}>로그인</button>
          <button type="button" onClick={signUpNewUser}>회원가입</button>
        </form>
        <button type="button" onClick={goToSignUp}>
          회원가입 페이지로 이동
        </button>
      </div>
    );
  } else {
    // 로그인된 상태에서의 렌더링
    return <Home />;
  }
};

export default LoginPage;
