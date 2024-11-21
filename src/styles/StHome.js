import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  background-image: url('/bg.gif'); /* 배경 이미지 경로 */
  background-size: cover; /* 배경 이미지가 화면에 맞게 확대 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center center; /* 이미지 가운데 정렬 */
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 1rem;
  /* background: white; */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const RightSection = styled.div`
  flex: 2;
  padding: 1rem;
  /* background: white; */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
export { PageContainer, LeftSection, RightSection };
