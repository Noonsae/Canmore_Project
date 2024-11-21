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
    cursor: url('../public/cursor-dino.png'), auto; /* 마우스 커서를 커스텀 이미지로 변경 */
  }

  body {    
    font-family: 'DungGeunMo';
    color: #111;
    background-image: url('../public/bg.png'); /* 이미지 경로 */
    background-size: cover; /* 이미지를 화면에 맞게 확대 */
    background-repeat: no-repeat; /* 이미지 반복 방지 */
    background-position: center center; /* 이미지 가운데 정렬 */
    background-attachment: fixed;
    background-size: cover;
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

/* 스크롤바 전체 */
::-webkit-scrollbar {
    width: 12px; /* 스크롤바의 너비 설정 */
}

/* 스크롤바 트랙 */
::-webkit-scrollbar-track {
    background: #f1f1f1; /* 트랙의 배경색 설정 */
}

/* 스크롤바 핸들 */
::-webkit-scrollbar-thumb {
    background: #888; /* 핸들의 배경색 설정 */
}

/* 스크롤바 핸들 호버 시 */
::-webkit-scrollbar-thumb:hover {
    background: #555; /* 호버 시 핸들의 배경색 변경 */
}

button{border: 3px solid #eee;
border-right-color: #aaa;
border-bottom-color: #aaa;
cursor: pointer;}
`;

export default GlobalStyle;
