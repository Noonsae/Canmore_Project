import { useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/userContext';

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
  justify-content: space-between; /* 왼쪽: 좋아요/댓글, 오른쪽: 수정/삭제/더보기 */
  align-items: center;
`;

const LeftActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RightActions = styled.div`
  display: flex;
  gap: 8px; /* 버튼 간격 */
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:nth-child(1) {
    background-color: #4caf50; /* 수정 버튼 */
    color: white;
  }

  &:nth-child(2) {
    background-color: #f44336; /* 삭제 버튼 */
    color: white;
  }

  &:nth-child(3) {
    background-color: #2196f3; /* 더보기 버튼 */
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

function FeedBox({ feed, onCommentClick, onToggleLike, onUpdate, onDelete, userId }) {
  const { user_id } = useContext(UserContext);
  const [showFullContent, setShowFullContent] = useState(false); // 더보기 상태 관리
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editedContent, setEditedContent] = useState(feed.content); // 수정된 내용

  console.log(user_id, feed.user_id);
  const truncatedContent =
    feed.content.length > 100 && !showFullContent && !isEditing ? `${feed.content.slice(0, 100)}...` : editedContent;

  const handleSave = () => {
    if (!feed.user_id || feed.user_id !== user_id) {
      // feed.user_id가 없는 경우 예외 처리
      alert('작성자만 수정할 수 있습니다.');
      setIsEditing(false); // 수정 모드 해제
      setEditedContent(feed.content); // 수정된 내용을 원래 내용으로 되돌림
      return;
    }

    onUpdate(feed.id, editedContent);
    setIsEditing(false); // 수정 모드 해제
  };

  return (
    <FeedContainer>
      <FeedHeader>{feed.userName}</FeedHeader>
      {feed.image_url && <FeedImage src={feed.image_url} alt="피드 이미지" />}

      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          style={{ width: '100%', height: '80px', marginBottom: '10px' }}
        />
      ) : (
        <p>{truncatedContent}</p>
      )}

      <FeedFooter>
        {/* 좋아요/댓글 버튼: 왼쪽 정렬 */}
        <LeftActions>
          <button onClick={() => onToggleLike(feed.id, userId)}>좋아요 ({feed.likes})</button>
          <button onClick={onCommentClick}>댓글 달기 ({feed.comments})</button>
        </LeftActions>

        {/* 수정/삭제/더보기 버튼: 오른쪽 정렬 */}
        <RightActions>
          {isEditing ? (
            <>
              <ActionButton onClick={handleSave}>저장</ActionButton>
              <ActionButton onClick={() => setIsEditing(false)}>취소</ActionButton>
            </>
          ) : (
            <>
              {user_id === feed.user_id && <ActionButton onClick={() => setIsEditing(true)}>수정</ActionButton>}
              {user_id === feed.user_id && <ActionButton onClick={() => onDelete(feed.id)}>삭제</ActionButton>}
              {feed.content.length > 100 && !showFullContent && (
                <ActionButton onClick={() => setShowFullContent(true)}>더보기</ActionButton>
              )}
            </>
          )}
        </RightActions>
      </FeedFooter>
    </FeedContainer>
  );
}

export default FeedBox;
