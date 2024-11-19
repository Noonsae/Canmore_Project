import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    font-size: 0.625rem;
  }

  body {    
    background-color: #fff;
    color: #111;
  }
  /* 추가적인 스타일을 여기에 작성할 수 있습니다. */
`;

export default GlobalStyle;
