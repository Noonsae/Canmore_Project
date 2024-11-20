import { useState, useEffect } from 'react';
import supabase from '../supabase/supabase';
import styled from 'styled-components';
import ProfileBox from '../components/ProfileBox';
import FollowerBox from '../components/FollowerBox';
import FeedBox from '../components/FeedBox';
import CommentModal from '../components/CommentModal';
import { PageContainer, LeftSection, RightSection } from '../styles/StHome';

const HallOfFameBox = styled.div`
  background-color: #fff5d5;
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
  const [feeds, setFeeds] = useState([]);
  const [hallOfFame, setHallOfFame] = useState([]);
  const [userId, setUserId] = useState(null); // 현재 로그인된 사용자 ID
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('id, content, image_url, hashtag, user_id, users!inner(nickname)');

        if (postsError) throw postsError;

        const { data: likes, error: likesError } = await supabase.from('likes').select('post_id');

        if (likesError) throw likesError;

        const postsWithLikes = posts.map((post) => {
          const likeCount = likes.filter((like) => like.post_id === post.id).length;
          return { ...post, like_count: likeCount };
        });

        const sortedHallOfFame = [...postsWithLikes].sort((a, b) => b.like_count - a.like_count).slice(0, 3);

        setFeeds(postsWithLikes);
        setHallOfFame(sortedHallOfFame);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFeeds();
  }, []);

  const filteredFeeds = selectedUser ? feeds.filter((feed) => feed.user_id === selectedUser) : feeds;

  const handleCommentClick = (feed) => {
    setSelectedFeed(feed);
    setIsModalOpen(true);
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
              <HallOfFameText>{feed.users.nickname}</HallOfFameText>
              <span>❤️ {feed.like_count || 0}</span>
              {/* <HallOfFameItem key={feed.id} onClick={() => setSelectedUser(feed.userName)}>
              <HallOfFameText>{feed.userName}</HallOfFameText>
              <span>❤️ {feed.likes.length}</span> */}
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
      </RightSection>

      {isModalOpen && selectedFeed && (
        <CommentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feedId={selectedFeed.id} />
      )}
    </PageContainer>
  );
}

export default HomePage;
