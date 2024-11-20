import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabase/supabase';

const HeaderContainer = styled.header`
  background-color: #f5f5f5;
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

const Header = () => {
  // 첫 화면으로 돌아가는 btn
  const handleLogOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log('signout: ', { data, error });
    useNavigate('/home');
  };

  return (
    <HeaderContainer>
      <SiteTitle>사이트명</SiteTitle>
      <NavMenu>
        <NavItem to="/">홈</NavItem>
        <NavItem to="/timeline">타임라인</NavItem>
        <NavItem to="/bookmark">즐겨찾기</NavItem>
        <NavItem to="/write">글쓰기</NavItem>
        <NavItem to="/">로그아웃</NavItem>
        <button onClick={handleLogOut}>로그아웃</button>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;
