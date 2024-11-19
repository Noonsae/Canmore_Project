import Header from './Header';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  background-color: #fff;
`;

const Layout = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <Content>{children}</Content>
    </PageContainer>
  );
};

export default Layout;

// App.js에서 Router로 페이지 경로를 정의.
// Layout은 페이지마다 공통으로 헤더(Header)를 포함.
// 사용자가 네비게이션 메뉴(홈, 타임라인 등)를 클릭하면 
// 해당 경로에 맞는 페이지가 Layout의 children으로 렌더링.