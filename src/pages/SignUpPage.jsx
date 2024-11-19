import { useState } from 'react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userId: '',
    password: '',
    checkPassword: '',
  });

  const { userName, userId, password, checkPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== checkPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 데이터:', formData);
    alert('회원가입 완료!');
    setFormData({
      userName: '',
      userId: '',
      password: '',
      checkPassword: '',
    });
  };

  return (
    <div className="signUp-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userName">이름</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            placeholder="이름을 입력하세요"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            placeholder="아이디를 입력하세요"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="checkPassword">비밀번호 확인</label>
          <input
            type="password"
            id="checkPassword"
            name="checkPassword"
            value={checkPassword}
            placeholder="비밀번호를 다시 입력하세요"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;

