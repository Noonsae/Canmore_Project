import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #f7f7f7; /* 페이지 배경 */
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const RightSection = styled.div`
  flex: 2;
  padding: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
export { PageContainer, LeftSection, RightSection };
