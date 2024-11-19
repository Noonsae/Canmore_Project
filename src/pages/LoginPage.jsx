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
  background-color: #f9f9f9; /* 회원가입 페이지와 동일한 배경 */
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

const SignUpButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: #007bff;
  font-size: 14px;
  border: none;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const LoginPage = () => {
  // 입력 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 에러 또는 성공 메시지 표시
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // 메시지 초기화

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`로그인 실패: ${error.message}`); // 에러 메시지 표시
    } else {
      setMessage('로그인 성공!'); // 성공 메시지 표시
      navigate('/home'); // 홈 페이지로 이동
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
        <SignUpButton onClick={() => navigate('/sign-up')}>회원가입</SignUpButton>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;
