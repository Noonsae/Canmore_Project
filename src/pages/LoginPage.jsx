import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase';

const LoginPage = () => {
  // 입력 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 에러 또는 성공 메시지 표시
  const [message, setMessage] = useState(''); 

  // react-router-dom Navigate Hook
  const navigate = useNavigate();

  // 이메일 입력 변경 핸들러
  const handleEmailChange = (e) => setEmail(e.target.value);

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 로그인 처리 함수
  const handleLogin = async (e) => {

    // btn 기본동작(re-load)방지
    e.preventDefault();

    // 메시지 초기화
    setMessage(''); 

    // Supabase 로그인 요청
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 에러 메시지 표시
    if (error) {
      setMessage(`로그인 실패: ${error.message}`); 
    } else {
      // 성공 메시지 표시
      setMessage('로그인 성공!'); 
      // 홈 페이지로 이동
      navigate('/home'); 
    }
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <label>이메일</label>
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">로그인</button>
      </form>
      {/* 메시지 표시 */}
      {message && <p>{message}</p>} 
      {/* 회원가입 페이지로 이동 */}
      <button onClick={() => navigate('/sign-up')}>회원가입</button> 
    </div>
  );
};

export default LoginPage;
