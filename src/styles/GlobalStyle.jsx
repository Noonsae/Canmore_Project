import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

@font-face {
     font-family: 'DungGeunMo';
     src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
     font-weight: normal;
     font-style: normal;
  }

  * {
    box-sizing: border-box;
    font-size: 10px;
  }

  body {    
    background-color: #fff;
    font-family: 'DungGeunMo';
    color: #111;
  }

  /* 추가적인 스타일을 여기에 작성할 수 있습니다. */

  input {
    padding: 8px;
    border: 2px solid #555;
    background-color: #eeeeee;
    width: 100%;
    box-shadow: 2px 2px 0 #888;  
  }
  input::placeholder{
    font-family: 'DungGeunMo';
  }
  input:focus, 
  input:active{
    border: 2px solid #000;
    outline: none;
  }
  input:required{
    border: 2px solid #555;
    background-color: #eee;

  }



`;

export default GlobalStyle;
