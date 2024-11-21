import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import supabase from '../supabase/supabase'; // Supabase 클라이언트 가져오기
import ProfileBox from '../components/ProfileBox';
import FollowerBox from '../components/FollowerBox';
import FeedBox from '../components/FeedBox';
import CommentModal from '../components/CommentModal';
import { PageContainer, LeftSection, RightSection } from '../styles/StHome';
import InfScroll from '../components/InfScroll';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { UserContext } from '../context/userContext';

const HallOfFameBox = styled.div`
  background-color: #fff5d5;
  background-image: url('../public/rank.gif'); /* GIF 배경 이미지 경로 */
  background-size: cover; /* 배경 이미지가 컨테이너 크기에 맞게 조정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center; /* 이미지 가운데 정렬 */
  margin-top: 20px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HallOfFameTitle = styled.h4`
  margin-bottom: 15px;
  font-size: 16px;
`;

const HallOfFameItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffcccc;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ffaaaa;
  }
`;

const HallOfFameText = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

function HomePage() {
  const { user_id, setUser_id } = useContext(UserContext);
  const [feeds, setFeeds] = useState([]); // Supabase에서 가져온 데이터를 저장할 상태
  const [userId, setUserId] = useState(null); // 현재 로그인된 사용자 ID
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Supabase에서 데이터 가져오기
  useEffect(() => {
    const fetchFeeds = async () => {
      const { data, error } = await supabase.from('posts').select('*,users (nickname)'); // 'posts' 테이블에서 모든 데이터 가져오기
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setFeeds(data); // 가져온 데이터를 상태에 저장
      }
    };

    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser(); // 로그인된 사용자 정보 가져오기
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(data.user.id || null); // 사용자 ID 설정
      }
    };

    fetchFeeds();
    fetchUserId();
  }, [setUser_id]); // 컴포넌트가 처음 렌더링될 때 한 번 실행

  // 명예의 전당 데이터: 좋아요 수로 정렬
  const hallOfFame = feeds
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  // 명예의 전당에서 선택된 사용자의 뉴스피드 필터링
  const filteredFeeds = selectedUser ? feeds.filter((feed) => feed.user_id  === selectedUser) : feeds;

  // 댓글 버튼 클릭 핸들러
  const handleCommentClick = (feed) => {
    setSelectedFeed(feed);
    setIsModalOpen(true);
  };

// 좋아요 상태 업데이트 핸들러
const handleLikeChange = (postId, isLiked) => {
  setFeeds((prevFeeds) =>
    prevFeeds.map((feed) =>
      feed.id === postId
        ? { ...feed, likes: isLiked ? feed.likes + 1 : Math.max(feed.likes - 1, 0) }
        : feed
    )
  );
};

  // 삭제 로직
  const deletePost = async (feedId) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', feedId); // feed ID를 기준으로 삭제
      if (error) throw error;

      // 상태에서 해당 피드 삭제
      setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== feedId));
      alert('뉴스피드가 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('뉴스피드 삭제 중 오류가 발생했습니다.');
    }
  };

  // 수정 로직
  const updatePost = async (feedId, updatedContent) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ content: updatedContent }) // 수정할 데이터 지정
        .eq('id', feedId); // 조건: feed ID가 일치해야 함

      if (error) throw error;

      // 상태 업데이트: UI에서도 즉시 반영
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) => (feed.id === feedId ? { ...feed, content: updatedContent } : feed))
      );

      alert('뉴스피드가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('뉴스피드 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <PageContainer>
      <LeftSection>
        <ProfileBox />
        <FollowerBox />
        <HallOfFameBox>
          <HallOfFameTitle>명예의 전당</HallOfFameTitle>
          {hallOfFame.map((feed) => (
            <HallOfFameItem key={feed.id} onClick={() => setSelectedUser(feed.user_id)}>
              <HallOfFameText>{feed.users.nickname}의 게시물</HallOfFameText>
              <img
        src="../public/5.gif" // 이미지 경로
        alt="likes"
        style={{ width: '24px', height: '24px', marginLeft: '8px' }} // 이미지 스타일
      /><span> {feed.likes}</span>
            </HallOfFameItem>
          ))}
        </HallOfFameBox>
      </LeftSection>

      <RightSection>
        <h2>뉴스피드</h2>
        {filteredFeeds.length > 0 ? (
          filteredFeeds.map((feed) => (
            <FeedBox
              key={feed.id}
              feed={feed}
              onCommentClick={() => handleCommentClick(feed)}


              onLikeChange={handleLikeChange}

              onUpdate={(feedId, content) => {
                if (feed.user_id === userId) {
                  // **현재 로그인한 사용자만 수정 가능**
                  updatePost(feedId, content);
                } else {
                  alert('작성자만 수정할 수 있습니다.');
                }
              }}
              onDelete={(feedId) => {
                if (feed.user_id === userId) {
                  // **현재 로그인한 사용자만 삭제 가능**
                  deletePost(feedId);
                } else {
                  alert('작성자만 삭제할 수 있습니다.');
                }
              }}
            />
          ))
        ) : (
          <p>뉴스피드가 없습니다.</p>
        )}
        <InfScroll />
        <ScrollToTopButton />
      </RightSection>

      {isModalOpen && selectedFeed && (
        <CommentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feedId={selectedFeed.id} />
      )}
    </PageContainer>
  );
}

export default HomePage;
