import React from "react";
import styled from "styled-components";

const FeedContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FeedHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FeedImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
`;

const FeedFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background: #4267b2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #365899;
  }
`;

function FeedBox({ feed }) {
  return (
    <FeedContainer>
      <FeedHeader>{feed.name}</FeedHeader>
      <FeedImage src={feed.image} alt={feed.name} />
      <FeedFooter>
        <LeftActions>
          <Button>좋아요 ({feed.likes})</Button>
          <Button>댓글 달기 ({feed.comments})</Button>
        </LeftActions>
        <Button>...더보기</Button>
      </FeedFooter>
    </FeedContainer>
  );
}

export default FeedBox;