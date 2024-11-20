import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileBox from '../components/ProfileBox';
import FollowerBox from '../components/FollowerBox';
import FeedBox from '../components/FeedBox';
import { PageContainer, LeftSection, RightSection } from '../styles/StHome';

// 명예의 전당 스타일
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

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  // 임시 데이터
  const feeds = [
    {
      id: 1,
      name: '피카츄',
      image: 'https://via.placeholder.com/150',
      likes: 10,
      comments: 5
    },
    {
      id: 2,
      name: '꼬부기',
      image: 'https://via.placeholder.com/150',
      likes: 8,
      comments: 3
    },
    {
      id: 3,
      name: '파이리',
      image: 'https://via.placeholder.com/150',
      likes: 12,
      comments: 7
    },
    {
      id: 4,
      name: '버터플',
      image: 'https://via.placeholder.com/150',
      likes: 9,
      comments: 4
    }
  ];

  // 명예의 전당 데이터 좋아요 수로 정렬!!!
  const hallOfFame = [...feeds].sort((a, b) => b.likes - a.likes).slice(0, 3);

  // 선택된 유저 게시물 필터링->어떻게 해야하나!
  const filteredFeeds = selectedUser ? feeds.filter((feed) => feed.name === selectedUser) : feeds;

  return (
    <PageContainer>
      <LeftSection>
        <ProfileBox />
        <FollowerBox />
        <HallOfFameBox>
          <HallOfFameTitle>명예의 전당</HallOfFameTitle>
          {hallOfFame.map((user) => (
            <HallOfFameItem key={user.id} onClick={() => setSelectedUser(user.name)}>
              <HallOfFameText>{user.name}</HallOfFameText>
              <span>❤️ {user.likes}</span>
            </HallOfFameItem>
          ))}
        </HallOfFameBox>
      </LeftSection>
      <RightSection>
        {filteredFeeds.map((feed) => (
          <FeedBox key={feed.id} feed={feed} />
        ))}
      </RightSection>
    </PageContainer>
  );
}

export default Home;
