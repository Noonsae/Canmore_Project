import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabase/supabase';

// 스타일 컴포넌트 정의 (기존 스타일과 동일)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const ResetBox = styled.div`
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
  color: ${(props) => (props.error ? 'red' : 'green')};
  text-align: center;
  margin-top: 10px;
`;

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 토큰 가져오기
  const accessToken = searchParams.get('access_token');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');

    // Supabase 비밀번호 재설정 API 호출
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage({ text: `비밀번호 재설정 실패: ${error.message}`, error: true });
    } else {
      setMessage({ text: '비밀번호가 성공적으로 변경되었습니다!', error: false });
      setTimeout(() => navigate('/login'), 3000); // 3초 후 로그인 페이지로 이동
    }
  };

  if (!accessToken) {
    return <Container><Message error={true}>유효하지 않은 요청입니다.</Message></Container>;
  }

  return (
    <Container>
      <ResetBox>
        <Title>비밀번호 재설정</Title>
        <form onSubmit={handlePasswordChange}>
          <Input
            type="password"
            placeholder="새로운 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">비밀번호 변경</Button>
        </form>
        {message && <Message error={message.error}>{message.text}</Message>}
      </ResetBox>
    </Container>
  );
};

export default ResetPasswordPage;
