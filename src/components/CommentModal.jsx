import { useState, useEffect } from "react";
import { useFeed } from "../context/FeedContext";
import styled from "styled-components";

const CommentModal = ({ isOpen, onClose, feedId }) => {
  const { feeds, addComment, deleteComment } = useFeed();
  const [currentFeed, setCurrentFeed] = useState(null); // 현재 선택된 피드
  const [newComment, setNewComment] = useState(""); // 새 댓글 내용

  useEffect(() => {
    const feed = feeds.find((feed) => feed.id === feedId);
    setCurrentFeed(feed || null);
  }, [feedId, feeds]);

  const handleSaveComment = () => {
    if (!newComment.trim()) {
      alert("댓글을 작성하세요!");
      return;
    }

    const confirmSave = window.confirm("댓글을 저장하시겠습니까?");
    if (!confirmSave) return;

    const newCommentData = { // 이 부분은 슈퍼베이스로 대체 될듯
      id: Date.now(),
      userName: "로그인한 사용자", // 실제 로그인 사용자 이름으로 대체
      content: newComment,
      createdAt: new Date().toLocaleString(),
    };

    addComment(feedId, newCommentData); // FeedContext에서 댓글 추가
    setNewComment(""); // 입력 초기화
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      deleteComment(feedId, commentId); // FeedContext에서 댓글 삭제
    }
  };

  if (!isOpen || !currentFeed) return null;

  return (
    <Overlay>
      <ModalContent>
        <Header>
          <h3>{currentFeed.userName}님의 뉴스피드</h3>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </Header>
        <Body>
          <p>{currentFeed.content}</p>
          <h4>댓글</h4>
          <CommentList>
            {currentFeed.comments.map((comment) => (
              <CommentItem key={comment.id}>
                <strong>{comment.userName}</strong>
                <p>{comment.content}</p>
                <small>작성 시간: {comment.createdAt}</small>
                <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
              </CommentItem>
            ))}
          </CommentList>
          <CommentInput>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성하세요..."
            />
            <button onClick={handleSaveComment}>저장하기</button>
          </CommentInput>
        </Body>
      </ModalContent>
    </Overlay>
  );
};

export default CommentModal;

// 스타일 정의
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 500px;
  padding: 20px;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Body = styled.div`
  h4 {
    margin-top: 20px;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;

  strong {
    font-weight: bold;
  }
`;

const CommentInput = styled.div`
  margin-top: 20px;

  textarea {
    width: 100%;
    height: 50px;
    resize: none;
    margin-bottom: 10px;
  }

  button {
    padding: 5px 10px;
    background: blue;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
`;
