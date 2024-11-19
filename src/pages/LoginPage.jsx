import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase';
import Home from './Home';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpNewUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("signup: ", { data, error });
  };

  const signInUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("signin: ", { data, error });
    // setUser(data.user);
  };

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/sign-up');
  };

  if (!user) {
    return (      
        <div className="login-container">
          <h1>아 몰랑 언젠간 이름이 생길거야 ㅇㅅㅇ</h1>
          <form onSubmit={signUpNewUser}>
            <label>login-id</label>
            <input type="text" placeholder="아이디를 입력해주세요." value={email} onChange={onChangeEmail} required />
            <label>login-pw</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onChangePassword}
              required
            />
            <button type="submit" onClick={signInUser}>로그인</button>
          </form>
          <button type="button" onClick={goToSignUp}>
            회원가입
          </button>

          {/* <img src={imgSlide} alt="" size={"cover"}/> */}
        </div>
    );
  }  else {
    return (
      <>
      <Home/>
      </>
    );
  }
}
export default LoginPage;