import React, { useState } from 'react';
import supabase from '../supabase/supabase';

const SignUpPage = () => {
  // 1. 회원가입 함수 (auth.signUp)

  const [userName, setUserName] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [user, setUser] = useState(null);

  const onChangeUserName = (e) => setUserName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangePasswordCheck = (e) => setPasswordCheck(e.target.value);

  const signUpNewUser = async (e) => {
    e.preventDefault();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            userName: userName
          }
        }
      });

      console.log("sign-up: ", {data, error});
      setUser(data.user);
    };

  return (

    <div className="signUp-container">
      <h1>아 몰랑 언젠간 이름이 생길거야 ㅇㅅㅇ</h1>
      <p>빠르고 쉽게 가입할 수 있습니다.</p>
      <form onSubmit={signUpNewUser}>        

          <label htmlFor="userName">이름</label>
          <input
            type="text"
            id="userName"   
            value={userName}
            placeholder="사용하실 이름을 다시 입력해주세요."
            onChange={onChangeUserName}
            required
          />

          <label htmlFor="userId">이메일</label>
          <input
            type="email"
            id="email"            
            value={email}
            placeholder="아이디를 다시 입력해주세요."
            onChange={onChangeEmail}
            required
          />
        
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            autocomplete="off"
            placeholder="비밀번호를 입력해주세요."
            onChange={onChangePassword}
            required
          />
        
          <label htmlFor="checkPassword">비밀번호 확인</label>
          <input
            type="password"
            id="checkPassword"            
            value={passwordCheck}
            autocomplete="off"
            placeholder="비밀번호를 다시 입력해주세요."
            onChange={onChangePasswordCheck}
            required
          />

        <button type='onSubmit'>가입 요청</button>
      </form>
    </div>
  );
};

export default SignUpPage;
