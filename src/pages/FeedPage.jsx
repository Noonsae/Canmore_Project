import { useState } from 'react';
import { useFeed } from '../context/FeedContext';
import PostForm from '../components/PostForm';
import CommentModal from '../components/CommentModal';
import LikeButton from '../components/LikeButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import InfScroll from '../components/InfScroll';

const FeedPage = () => {
  const { feeds, updatePost, deletePost } = useFeed();
  const [isModalOpen, setIsModalOpen] = useState(false); // 댓글 모달 상태
  const [selectedFeed, setSelectedFeed] = useState(null); // 선택한 피드 데이터

  const [isEditing, setIsEditing] = useState(null); // 수정 중인 뉴스피드 ID
  const [editContent, setEditContent] = useState(''); // 수정 중인 내용
  const [editImage, setEditImage] = useState(null); // 수정 중인 이미지
  const fileInputRef = useState(null); // 파일 입력 필드 참조

  const handleEditFeed = (feed) => {
    setIsEditing(feed.id);
    setEditContent(feed.content); // 기존 내용을 상태에 저장
    setEditImage(feed.image_url); // 기존 이미지를 상태에 저장
  };

  const handleSaveEditFeed = (feedId) => {
    if (!editContent.trim()) {
      alert('수정할 내용을 입력하세요.');
      return;
    }

    const confirmSave = window.confirm('뉴스피드를 수정하시겠습니까?');
    if (!confirmSave) return;

    const updatedPost = {
      content: editContent,
      image_url: editImage || null, // 기존 이미지 유지
      updatedAt: new Date().toLocaleString()
    };

    updatePost(feedId, updatedPost); // FeedContext에서 업데이트
    setIsEditing(null); // 수정 모드 종료
    setEditContent(''); // 상태 초기화
    setEditImage(null); // 상태 초기화
  };

  const handleDeleteFeed = (feedId) => {
    if (window.confirm('이 뉴스피드를 삭제하시겠습니까?')) {
      deletePost(feedId);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(URL.createObjectURL(file)); // 새 이미지로 업데이트
    }
  };

  const handleCommentClick = (feed) => {
    setSelectedFeed(feed); // 선택된 피드 설정
    setIsModalOpen(true); // 댓글 모달 열기
  };

  return (
    <div>
      <h1>뉴스피드</h1>
      <PostForm />
      {feeds.length > 0 ? (
        feeds.map((feed) => (
          <div key={feed.id} style={{ marginBottom: '20px' }}>
            {isEditing === feed.id ? (
              <div>
                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                {editImage && <img src={editImage} alt="첨부 이미지" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                <button onClick={() => handleSaveEditFeed(feed.id)}>저장</button>
                <button onClick={() => setIsEditing(null)}>취소</button>
              </div>
            ) : (
              <>
                <p>{feed.content}</p>
                {feed.image_url && (
                  <img src={feed.image_url} alt="첨부 이미지" style={{ maxWidth: '100%', marginTop: '10px' }} />
                )}
                <small>
                  작성 시간: {feed.createdAt}
                  {feed.updatedAt && ` (수정됨: ${feed.updatedAt})`}
                </small>
                <button onClick={() => handleEditFeed(feed)}>수정</button>
                <button onClick={() => handleDeleteFeed(feed.id)}>삭제</button>
                <button onClick={() => handleCommentClick(feed)}>댓글 작성</button>
                <LikeButton />
                <ScrollToTopButton />
                <InfScroll />
              </>
            )}
          </div>
        ))
      ) : (
        <p>작성된 뉴스피드가 없습니다.</p>
      )}

      {/* 댓글 작성 모달 */}
      {isModalOpen && selectedFeed && (
        <CommentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feedId={selectedFeed.id} />
      )}
    </div>
  );
};

export default FeedPage;
