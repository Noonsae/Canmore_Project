import React, { useState } from 'react';
// Supabase 클라이언트 임포트
import supabase from '../supabase/supabase';
// 페이지 이동을 위한 useNavigate Hook 임포트
import { useNavigate } from 'react-router-dom';
// 스타일 컴포넌트 라이브러리 임포트
import styled from 'styled-components'; 

// 전체 회원가입 페이지 컨테이너 스타일 정의
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이를 차지 */
  background-color: #fff; /* 배경색 설정 */
`;

// 회원가입 폼 스타일 정의
const Form = styled.form`
  width: 100%; /* 100% 너비 */
  max-width: 400px; /* 최대 너비 */
  background: white; /* 폼 배경색 */
  padding: 20px; /* 내부 여백 */
  border-radius: 8px; /* 테두리 둥글게 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
`;

// 각 폼 필드(입력 필드) 스타일 정의
const FormField = styled.div`
  margin-bottom: 15px; /* 각 필드 사이 간격 */

  label {
    display: block; /* 레이블을 블록 요소로 설정 */
    font-size: 1.3em; /* 폰트 크기 */
    margin-bottom: 5px; /* 레이블과 입력 필드 사이 간격 */
  }

  input {
    width: 100%; /* 입력 필드 너비를 부모 너비에 맞춤 */
    padding: 10px; /* 내부 여백 */
    border: 1px solid #ccc; /* 입력 필드 테두리 */
    border-radius: 4px; /* 테두리 둥글게 */
    font-size: 1.3em; /* 폰트 크기 */
  }
`;

// 메시지(성공/오류 메시지) 스타일 정의
const Message = styled.p`
  font-size: 1.6em; /* 메시지 폰트 크기 */
  font-weight: bold; /* 폰트 굵기 */
  color: ${({ isError }) => (isError ? 'red' : 'green')}; /* 오류 메시지는 빨간색, 성공 메시지는 초록색 */
  margin-top: 10px; /* 위 요소와의 간격 */
`;

// 버튼 스타일 정의
const Button = styled.button`
  width: 100%; /* 버튼 너비를 부모에 맞춤 */
  padding: 10px 15px; /* 버튼 내부 여백 */
  font-size: 1.6em; /* 버튼 텍스트 크기 */
  color: white; /* 버튼 텍스트 색상 */
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')}; /* 비활성화 상태일 때와 활성화 상태의 배경색 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 버튼 테두리 둥글게 */
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')}; /* 커서 모양 설정 */
  margin-top: 10px; /* 버튼 위 간격 */

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#0056b3')}; /* 마우스 오버 시 배경색 변경 */
  }
`;

// 회원가입 성공 시 표시되는 컨테이너 스타일 정의
const SuccessContainer = styled.div`
  text-align: center; /* 중앙 정렬 */
`;

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
    verify_password: '', 
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
    { id: 'verify_password', type: 'password', placeholder: '비밀번호를 다시 입력해주세요.', label: '비밀번호 확인' },
  ];

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const validations = [
      { test: password.length >= 8, message: '비밀번호는 8자 이상이어야 합니다.' },
      { test: /[A-Z]/.test(password), message: '비밀번호에는 대문자가 포함되어야 합니다.' },
      { test: /[a-z]/.test(password), message: '비밀번호에는 소문자가 포함되어야 합니다.' },
      { test: /\d/.test(password), message: '비밀번호에는 숫자가 포함되어야 합니다.' },
      { test: /[!@#$%^&*]/.test(password), message: '비밀번호에는 특수 문자가 포함되어야 합니다.' },
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
      password: user_password,
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
    <SignUpContainer>
      {/* 회원가입 성공 여부에 따라 화면 렌더링 */}
      {!showNavigateButton ? (
        <Form onSubmit={signUpNewUser}>
          <h1 style={{ textAlign: 'center' }}>회원가입</h1>

          {/* 동적으로 렌더링되는 입력 필드 */}
          {formFields.map(({ id, type, placeholder, label }) => (
            <FormField key={id}>
              <label htmlFor={id}>{label}</label>
              <input
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
          {passwordError && <Message isError>{passwordError}</Message>}
          {errorMessage && <Message isError>{errorMessage}</Message>}

          {/* 가입 요청 버튼 */}
          <Button type="submit" disabled={loading}>
            {loading ? '가입 중...' : '가입 요청'}
          </Button>
        </Form>
      ) : (
        // 회원가입 성공 시 메시지와 버튼만 표시
        <SuccessContainer>
          <Message>{successMessage}</Message>
          <Button onClick={handleNavigate}>로그인 화면으로 이동</Button>
        </SuccessContainer>
      )}
    </SignUpContainer>
  );
};

export default SignUpPage;
