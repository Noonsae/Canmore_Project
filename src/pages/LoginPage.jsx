import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabase/supabase';

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const LoginBox = styled.div`
  width: 400px;
  padding: 20px 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const LinkButton = styled.button`
  margin-top: 10px;
  width: 100%;
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(`이메일 또는 비밀번호가 올바르지 않습니다.`);
    } else {      
      navigate('/home');
    }
  };

  // 비밀번호 재설정 요청 함수
  const handlePasswordReset = async () => {
    setResetMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // 비밀번호 재설정 페이지로 리디렉션
      redirectTo: 'http://localhost:5173/reset', 
    });
    if (error) {
      setResetMessage(`비밀번호 재설정 실패: ${error.message}`);
    } else {
      setResetMessage('비밀번호 재설정 이메일이 전송되었습니다.');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>로그인</Title>
        <form onSubmit={handleLogin}>
          <Label>이메일</Label>
          <Input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Button type="submit">로그인</Button>
        </form>
        {message && <Message>{message}</Message>}
        <LinkButton onClick={handlePasswordReset}>비밀번호를 잊으셨나요?</LinkButton>
        {resetMessage && <Message style={{ color: 'green' }}>{resetMessage}</Message>}
        <LinkButton onClick={() => navigate('/sign-up')}>회원가입</LinkButton>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;
