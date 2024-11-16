import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("SingUp");
  }
  
  const goToHome = () => {
    navigate("Home");
  }

  return (
    <>
      <div className="login-wrap">
        <form action="" method="post">
        <button type="button"
        onClick={goToSignUp}>회원가입하기</button>
        </form>
        <form action="" method="post">
        <button type="button"
        onClick={goToHome}>로그인하기</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
