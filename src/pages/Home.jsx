import { useState } from "react";
import { useFeed } from "../context/FeedContext";
import styled from "styled-components";
import ProfileBox from "../components/ProfileBox";
import FollowerBox from "../components/FollowerBox";
import FeedBox from "../components/FeedBox";
import CommentModal from "../components/CommentModal";
import { PageContainer, LeftSection, RightSection } from "../styles/StHome";

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
  const { feeds, toggleLike } = useFeed(); // 수정: toggleLike 추가
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 명예의 전당 데이터: 좋아요 수로 정렬
  const hallOfFame = feeds
    .filter((feed) => feed.likes && Array.isArray(feed.likes)) // 수정: likes 배열 확인
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 3);

  // 명예의 전당에서 선택된 사용자의 뉴스피드 필터링
  const filteredFeeds = selectedUser
    ? feeds.filter((feed) => feed.userName === selectedUser)
    : feeds;

  // 댓글 버튼 클릭 핸들러
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
            <HallOfFameItem
              key={feed.id}
              onClick={() => setSelectedUser(feed.userName)}
            >
              <HallOfFameText>{feed.userName}</HallOfFameText>
              <span>❤️ {feed.likes.length}</span>
            </HallOfFameItem>
          ))}
        </HallOfFameBox>
      </LeftSection>

      <RightSection>
        {filteredFeeds.map((feed) => (
          <FeedBox
            key={feed.id}
            feed={feed}
            onCommentClick={() => handleCommentClick(feed)}
            onToggleLike={toggleLike} // 수정: toggleLike 전달
          />
        ))}
      </RightSection>

      {isModalOpen && selectedFeed && (
        <CommentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          feedId={selectedFeed.id}
        />
      )}
    </PageContainer>
  );
}

export default Home;
