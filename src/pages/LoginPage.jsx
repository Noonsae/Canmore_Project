//  useState 임포트
import { useContext, useEffect, useState } from 'react';
//  useNavigate 임포트
import { useNavigate } from 'react-router-dom';
//  styled-components 임포트
import styled from 'styled-components';
//  supabase 연동
import supabase from '../supabase/supabase';
import {UserContext} from '../context/userContext'

const LoginPage = () => {
  const {setUser_id} = useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(`이메일 또는 비밀번호가 올바르지 않습니다.`);
    } else { 
    setUser_id(data.user.id)
      navigate('/HomePage');
      
    }
  };

  const array_image = [
    'slider_00.jpg',
    'slider_01.jpg',
    'slider_02.jpg',
    'slider_03.jpg',
    'slider_04.jpg',
    'slider_05.jpg',
    'slider_06.jpg',
  ];

  const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % array_image.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <SlideImg>
        {array_image.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`슬라이드 ${index + 1}`}
            style={{
              display: index === currentIndex ? 'block' : 'none',
              width: '100%',
              height: '100%'
            }}
          />
        ))}
      </SlideImg>
    );
  };

  return (
    <>
      <Welcome />
      <LoginWrap>
        <Logo>로그인페이지</Logo>
        <LoginForm onSubmit={handleLogin} noValidate>
          <LoginFieldset>
            <LoginLabel>이메일</LoginLabel>
            <LoginInput type="email" placeholder="이메일 입력" value={email} onChange={handleEmailChange} required />
          </LoginFieldset>
          <LoginFieldset>
            <LoginLabel>비밀번호</LoginLabel>
            <LoginInput
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </LoginFieldset>
          <LoginBtn type="submit">로그인</LoginBtn>
          <LoginBtn onClick={() => navigate('/sign-up')}>회원가입</LoginBtn>
        </LoginForm>

        <ImageSlider />
      </LoginWrap>
    </>
  );
};

export default LoginPage;

const Welcome = styled.div`
  width: 800px;
  height: 100px;

  margin: 70px auto;

  background: url(/welcom.gif) no-repeat center / cover;
`;

const LoginWrap = styled.div`
  width: 540px;
  height: 700px;
  color: #ccc;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 40px 0;
  border: 2px solid #111;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 34px;
  margin-bottom: 40px;
  color: #ccc;
`;

const LoginForm = styled.form`
  width: 400px;
  height: 240px;
  border: 2px solid #333;
  margin: 0 auto 20px;
`;

const LoginFieldset = styled.fieldset`
  display: flex;
  flex-direction: row;
  padding: 40px 30px 20px;
  &:nth-child(2) {
    padding-top: 10px;
  }
`;

const LoginLabel = styled.label`
  display: block;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: left;
`;

const LoginInput = styled.input`
  display: block;
  width: 250px;
  height: 40px;
  font-size: 16px;
  line-height: 45px;
`;
const LoginBtn = styled.button`
  display: inline-block;
  width: 80px;
  height: 30px;
  text-align: center;
  cursor: pointer;

  margin: 10px 20px;
  font-size: 14px;

  border: 3px solid #ccc;
  background-color: #ddd;
  border-right-color: #777;
  border-bottom-color: #777;
`;
const SlideImg = styled.div`
  width: 100%;
  height: 320px;

  box-sizing:border-box;  
`;
