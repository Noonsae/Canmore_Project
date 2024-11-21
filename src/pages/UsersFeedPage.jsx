import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FeedBox from '../components/FeedBox';
import supabase from '../supabase/supabase';

// 임시 뉴스피드 데이터
const newsFeedData = [
  {
    id: 1,
    userId: 1,
    name: '유저_01',
    content: '용용',
    image: 'https://via.placeholder.com/150',
    likes: 15,
    comments: 3,
    timestamp: '2024-11-18 10:00:00'
  },
  {
    id: 2,
    userId: 2,
    name: '유저_02',
    content: '홍홍',
    image: 'https://via.placeholder.com/150',
    likes: 22,
    comments: 5,
    timestamp: '2024-11-18 09:45:00'
  },
  {
    id: 3,
    userId: 1,
    name: '유저_01',
    content: '호옹홍',
    image: 'https://via.placeholder.com/150',
    likes: 8,
    comments: 2,
    timestamp: '2024-11-17 18:30:00'
  },
  {
    id: 4,
    userId: 3,
    name: '유저_03',
    content: '뇽뇽',
    image: 'https://via.placeholder.com/150',
    likes: 30,
    comments: 10,
    timestamp: '2024-11-17 14:20:00'
  },
  {
    id: 5,
    userId: 2,
    name: '유저_02',
    content: '뇽뇽',
    image: 'https://via.placeholder.com/150',
    likes: 18,
    comments: 7,
    timestamp: '2024-11-17 12:00:00'
  }
];

const PageContainer = styled.div`
  padding: 1rem;
`;

const Header = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
  color: #4267b2;
`;

const NoFeedMessage = styled.p`
  text-align: center;
  color: #888;
`;

function UserFeedPage() {
  const { id } = useParams(); // URL에서 userId를 가져옴
  const [userFeeds, setUserFeeds] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserFeeds = async () => {
      const { data: posts, error: postsError } = await supabase.from('posts').select('*').eq('user_id', id);

      if (postsError) {
        console.error('Error:', postsError);
      } else {
        setUserFeeds(posts);
      }

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('nickname')
        .eq('id', id)
        .single();

      if (userError) {
        console.error('Error:', userError);
      } else {
        setUserName(user.nickname);
      }
    };

    fetchUserFeeds();
  }, [id]);
  // 해당 사용자의 뉴스피드 필터링 ㅡㅇ아아ㅏ각ㄱ

  return (
    <PageContainer>
      <Header>{userName ? `${userName}님의 뉴스피드` : '로딩 중...'}</Header>
      {userFeeds.length > 0 ? (
        userFeeds.map((feed) => <FeedBox key={feed.id} feed={feed} />)
      ) : (
        <NoFeedMessage>이 사용자는 아직 게시물이 없습니다.</NoFeedMessage>
      )}
    </PageContainer>
  );
}

export default UserFeedPage;
