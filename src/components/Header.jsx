import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const SiteTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #4267b2;
  }
`;


const HomeImage = styled.img`
  width: 45px; /* 이미지의 가로 크기 */
  height: 60px; /* 이미지의 세로 크기 */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <SiteTitle>사이트명</SiteTitle>
      <NavMenu>
        <NavItem to="/">
          <HomeImage src="../public/14.gif" alt="홈" />
        </NavItem>
        <NavItem to="/timeline"><HomeImage src="../public/28.gif" alt="홈" /></NavItem>
        <NavItem to="/write"><HomeImage src="../public/7.gif" alt="홈" /></NavItem>
        <NavItem to="/"><HomeImage src="../public/21.png" alt="홈" /></NavItem>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;
