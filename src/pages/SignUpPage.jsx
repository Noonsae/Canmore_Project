import React, { useState } from 'react';
// styled-components 임포트
import styled from 'styled-components';
// Supabase 클라이언트 임포트
import supabase from '../supabase/supabase';
// 페이지 이동을 위한 useNavigate Hook 임포트
import { useNavigate } from 'react-router-dom';

// 회원가입 페이지 컴포넌트
const SignUpPage = () => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    // 사용자 이름
    user_name: '',
    // 사용자 이메일
    user_email: '',
    // 사용자 비밀번호
    user_password: '',
    // 비밀번호 확인
    verify_password: ''
  });

  // 로딩 상태 (비동기 요청 중 버튼 비활성화)
  const [loading, setLoading] = useState(false);

  // 비밀번호 오류 메시지 상태
  const [passwordError, setPasswordError] = useState('');

  // 회원가입 성공 메시지 상태
  const [successMessage, setSuccessMessage] = useState('');

  // 회원가입 오류 메시지 상태
  const [errorMessage, setErrorMessage] = useState('');

  // "로그인 화면으로 이동" 버튼 표시 상태
  const [showNavigateButton, setShowNavigateButton] = useState(false);

  // 페이지 이동을 위한 useNavigate Hook
  const navigate = useNavigate();

  // 폼 필드 설정 (필드 정보를 배열로 정의하여 동적으로 렌더링)
  const formFields = [
    { id: 'user_name', type: 'text', placeholder: '사용하실 이름을 입력해주세요.', label: '이름' },
    { id: 'user_email', type: 'email', placeholder: '사용하실 이메일을 입력해주세요.', label: '이메일' },
    { id: 'user_password', type: 'password', placeholder: '비밀번호를 입력해주세요.', label: '비밀번호' },
    { id: 'verify_password', type: 'password', placeholder: '비밀번호를 다시 입력해주세요.', label: '비밀번호 확인' }
  ];

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const validations = [
      { test: password.length >= 8, message: '비밀번호는 8자 이상이어야 합니다.' },
      { test: /[A-Z]/.test(password), message: '비밀번호에는 대문자가 포함되어야 합니다.' },
      { test: /[a-z]/.test(password), message: '비밀번호에는 소문자가 포함되어야 합니다.' },
      { test: /\d/.test(password), message: '비밀번호에는 숫자가 포함되어야 합니다.' },
      { test: /[!@#$%^&*]/.test(password), message: '비밀번호에는 특수 문자가 포함되어야 합니다.' }
    ];

    for (const validation of validations) {
      if (!validation.test) {
        // 유효성 검사 실패 시 해당 메시지 반환
        return validation.message;
      }
    }
    // 모든 조건을 만족하면 빈 문자열 반환
    return '';
  };

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    // 입력 필드의 ID와 값 추출
    const { id, value } = e.target;
    // 기존 상태를 복사하고 변경된 필드 업데이트
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 회원가입 처리 함수
  const signUpNewUser = async (e) => {
    // 기본 폼 제출 동작(리로딩) 방지
    e.preventDefault();

    const { user_email, user_password, verify_password } = formData;

    // 비밀번호와 확인 비밀번호가 다를 경우 오류 메시지 설정
    if (user_password !== verify_password) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 유효성 검사
    const passwordValidationError = validatePassword(user_password);
    if (passwordValidationError) {
      // 비밀번호 유효성 검사 실패 시 메시지 설정
      setPasswordError(passwordValidationError);
      return;
    }
    // 로딩 상태 활성화
    setLoading(true);

    // Supabase를 사용해 회원가입 요청
    const { error } = await supabase.auth.signUp({
      email: user_email,
      password: user_password
    });
    // 로딩 상태 비활성화
    setLoading(false);

    if (error) {
      // 오류 메시지 설정
      setErrorMessage('회원가입에 실패했습니다.');
    } else {
      // 성공 메시지 설정
      setSuccessMessage('축하합니다. 회원가입에 성공하셨습니다🎉');
      // 성공 후 로그인 버튼 표시
      setShowNavigateButton(true);
    }
  };

  // "로그인 화면으로 이동" 버튼 클릭 핸들러
  const handleNavigate = () => {
    // "/" 경로(첫 화면)로 페이지 이동
    navigate('/');
  };

  return (
    <Container>
      {/* 회원가입 성공 여부에 따라 화면 렌더링 */}
      {!showNavigateButton ? (
        <Form onSubmit={signUpNewUser}>
          <FormTitle>회원가입</FormTitle>

          {/* 동적으로 렌더링되는 입력 필드 */}
          {formFields.map(({ id, type, placeholder, label }) => (
            <FormField key={id}>
              <Label htmlFor={id}>{label}</Label>
              <SignUpInput
                id={id}
                type={type}
                value={formData[id]}
                placeholder={placeholder}
                onChange={handleChange}
                required
              />
            </FormField>
          ))}

          {/* 오류 메시지 출력 */}
          {passwordError && <Message error>{passwordError}</Message>}
          {errorMessage && <Message error>{errorMessage}</Message>}

          {/* 가입 요청 버튼 */}
          <Button type="submit" disabled={loading}>
            {loading ? '가입 중...' : '가입 요청'}
          </Button>
        </Form>
      ) : (
        // 회원가입 성공 시 메시지와 버튼만 표시
        <Form>
          <Message>{successMessage}</Message>
          <Button onClick={handleNavigate}>로그인 화면으로 이동</Button>
        </Form>
      )}
    </Container>
  );
};

export default SignUpPage;

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px;

  background-color: #fff;
`;

const Form = styled.form`
  display: inline-block;
  padding: 30px 40px;
  border: 2px solid #3277af;
  background-color: #fff;
  text-align: left;
  width: 500px;
  height: 600px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const FormTitle = styled.h1`
  color: #111;
  text-align: center;
  font-size: 34px;
  margin: 15px 0;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 21px;
`;

const SignUpInput = styled.input`
  width: 420px;
  height: 50px;

  font-size: 16px;
  margin-bottom: 5px;
`;

const Message = styled.p`
  color: ${(props) => (props.error ? 'red' : 'green')};
  font-weight: bold;
  text-align: center;
  margin: 220px 0 30px;
  font-size: ${(props) => (props.error ? '16px' : '18px')};
`;

const Button = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;

  border: 3px solid #ccc;
  border-right-color: #4682b4;
  border-bottom-color: #4682b4;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#2988d5')};

  font-size: 16px;
  color: #fff;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 2px 2px 0 #4682b4;
`;

