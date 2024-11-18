import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate('/sign-up');
  };

  const goToHome = () => {
    navigate('Home');
  };

  return (
    <>
      <div className="login-container">
        <h1>아 몰랑 언젠간 이름이 생길거야 ㅇㅅㅇ</h1>
        <form action="" method="post">
          <label>login-id</label>
          <input type="text" placeholder="아이디를 입력해주세요." required />
          <label>login-pw</label>
          <input type="password" placeholder="비밀번호를 입력해주세요." required />
          <button type="button" onClick={goToSignUp}>
            로그인
          </button>
        </form>
        <form action="" method="post">
          <button type="button" onClick={goToHome}>
            회원가입
          </button>
        </form>
        <img src="" alt=""/>
      </div>
    </>
  );
};

export default LoginPage;

