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
            </HallOfFameItem>
          ))}
        </HallOfFameBox>
      </LeftSection>

      <RightSection>
        {filteredFeeds.length > 0 ? (
          filteredFeeds.map((feed) => (
            <FeedBox key={feed.id} feed={feed} onCommentClick={() => handleCommentClick(feed)} />
          ))
        ) : (
          <p>피드가 없습니다.</p>
        )}
      </RightSection>

      {isModalOpen && selectedFeed && (
        <CommentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feedId={selectedFeed.id} />
      )}
    </PageContainer>
  );
}

export default HomePage;
