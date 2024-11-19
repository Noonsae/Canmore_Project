import styled from 'styled-components';

const Nav = styled.nav`
  background: #3b5998; /* 페이스북 파란색 */
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  color: white;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: white;
  }
`;

const NavLinks = styled.div`
  a {
    margin: 0 1rem;
    text-decoration: none;
    color: #dfe3ee; /* 연한 회색 */
    font-weight: bold;

    &:hover {
      color: white; /* 링크 호버 시 강조 */
    }
  }
`;

export { Nav, NavLinks };
