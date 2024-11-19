import { useState } from "react";
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
  height: auto;
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

function FeedBox({ feed, onCommentClick, onToggleLike }) {
  const [showFullContent, setShowFullContent] = useState(false); // 추가: 더보기 기능 상태 관리

  const truncatedContent =
    feed.content.length > 100 && !showFullContent
      ? `${feed.content.slice(0, 100)}...`
      : feed.content;

  return (
    <FeedContainer>
      <FeedHeader>{feed.userName}</FeedHeader>
      {feed.image_url && <FeedImage src={feed.image_url} alt="피드 이미지" />}
      <p>{truncatedContent}</p>
      {!showFullContent && feed.content.length > 100 && (
        <Button onClick={() => setShowFullContent(true)}>더보기</Button>
      )}
      <FeedFooter>
        <LeftActions>
          {/* 좋아요 버튼 */}
          <Button onClick={() => onToggleLike(feed.id, "user1")}> {/* 수정: toggleLike와 userId 전달 */}
            좋아요 ({feed.likes.length})
          </Button>
          {/* 댓글 달기 버튼 */}
          <Button onClick={onCommentClick}>
            댓글 달기 ({feed.comments.length})
          </Button>
        </LeftActions>
      </FeedFooter>
    </FeedContainer>
  );
}

export default FeedBox;
