import React, { useState } from 'react';
import supabase from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    verify_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validatePassword = (password) => {
    const validations = [
      { test: password.length >= 8, message: "비밀번호는 8자 이상이어야 합니다." },
      { test: /[A-Z]/.test(password), message: "비밀번호에는 대문자가 포함되어야 합니다." },
      { test: /[a-z]/.test(password), message: "비밀번호에는 소문자가 포함되어야 합니다." },
      { test: /\d/.test(password), message: "비밀번호에는 숫자가 포함되어야 합니다." },
      { test: /[!@#$%^&*]/.test(password), message: "비밀번호에는 특수 문자가 포함되어야 합니다." },
    ];

    for (const validation of validations) {
      if (!validation.test) {
        return validation.message;
      }
    }
    return ''; // 모든 조건을 만족하면 빈 문자열 반환
  };

  const signUpNewUser = async (e) => {
    e.preventDefault();

    const { user_email, user_password, verify_password } = formData;

    if (user_password !== verify_password) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!user_email || !user_password) {
      setPasswordError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const passwordValidationError = validatePassword(user_password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    setPasswordError(''); // 오류가 없으면 오류 메시지 초기화



    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: user_email,
      password: user_password,
    });
    setLoading(false);

    if (error) {
      handleError(error);
    } else {
      alert('축하합니다. 회원가입에 성공하셨습니다🎉');
      setFormData({ user_name: '', user_email: '', user_password: '', verify_password: '' }); // 폼 초기화
      navigate('/'); // 회원가입 성공 후 로그인 페이지로 이동
    }
  };

  const handleError = (error) => {
    if (error.code === '23505') {
      alert('이미 사용중인 이메일 입니다.');
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="signUp-container">
      <h1>아 몰랑 언젠간 이름이 생길거야 ㅇㅅㅇ</h1>
      <p>빠르고 쉽게 가입할 수 있습니다.</p>
      <form onSubmit={signUpNewUser}>
        <label htmlFor="user_name">이름</label>
        <input
          type="text"
          id="user_name"
          value={formData.user_name}
          placeholder="사용하실 이름을 다시 입력해주세요."
          onChange={handleChange}
          required
        />

        <label htmlFor="user_email">이메일</label>
        <input
          type="email"
          id="user_email"
          value={formData.user_email}
          placeholder="아이디를 다시 입력해주세요."
          onChange={handleChange}
          required
        />

        <label htmlFor="user_password">비밀번호</label>
        <input
          type="password"
          id="user_password"
          value={formData.user_password}
          autoComplete="off"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          required
        />

        <label htmlFor="verify_password">비밀번호 확인</label>
        <input
          type="password"
          id="verify_password"
          value={formData.verify_password}
          autoComplete="off"
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={handleChange}
          required
        />

        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <button type="submit" disabled={loading}>
          {loading ? '가입 중...' : '가입 요청'}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
