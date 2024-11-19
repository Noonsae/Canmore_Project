import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// 스타일 정의
const FollowerContainer = styled.div`
  margin-top: 1rem;
`;

const FollowerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FollowerCard = styled.div`
  text-align: center;
  background: #f7f7f7;
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const FollowerImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const FollowerName = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: #4b4f56;
`;

const ViewMoreButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  background: #4267b2;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:hover {
    background: #365899;
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }
`;

const FollowerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

const FollowerItem = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f7f7f7;
  cursor: pointer;

  &:hover {
    background: #e7e7e7;
  }
`;

// 컴포넌트 정의
function FollowerBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const followers = [
    { id: 1, name: '유저_01', image: 'https://via.placeholder.com/80', joinedAt: '2023-11-03' },
    { id: 2, name: '유저_02', image: 'https://via.placeholder.com/80', joinedAt: '2023-11-02' },
    { id: 3, name: '유저_03', image: 'https://via.placeholder.com/80', joinedAt: '2023-11-01' },
    { id: 4, name: '유저_04', image: 'https://via.placeholder.com/80', joinedAt: '2023-10-31' },
    { id: 5, name: '유저_05', image: 'https://via.placeholder.com/80', joinedAt: '2023-10-30' },
    { id: 6, name: '유저_06', image: 'https://via.placeholder.com/80', joinedAt: '2023-10-29' },
    { id: 7, name: '유저_07', image: 'https://via.placeholder.com/80', joinedAt: '2023-10-28' },
    { id: 8, name: '유저_08', image: 'https://via.placeholder.com/80', joinedAt: '2023-10-27' }
  ].sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt)); // 최근 가입 순으로 정렬

  const handleFollowerClick = (id) => {
    navigate(`/user/${id}`);
    setIsModalOpen(false);
  };

  return (
    <FollowerContainer>
      {/* 팔로워 그리드 - 상위 6명 */}
      <FollowerGrid>
        {followers.slice(0, 6).map((follower) => (
          <FollowerCard key={follower.id} onClick={() => handleFollowerClick(follower.id)}>
            <FollowerImage src={follower.image} alt={follower.name} />
            <FollowerName>{follower.name}</FollowerName>
          </FollowerCard>
        ))}
      </FollowerGrid>

      {/* '팔로워 목록 보기' 버튼 */}
      <ViewMoreButton onClick={() => setIsModalOpen(true)}>팔로워 목록 보기</ViewMoreButton>

      {/* 팔로워 목록 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: '400px',
            margin: 'auto',
            borderRadius: '10px'
          }
        }}
      >
        <ModalContent>
          <h2>팔로워 목록</h2>
          <FollowerList>
            {followers.map((follower) => (
              <FollowerItem key={follower.id} onClick={() => handleFollowerClick(follower.id)}>
                {follower.name} (가입일: {follower.joinedAt})
              </FollowerItem>
            ))}
          </FollowerList>
        </ModalContent>
      </Modal>
    </FollowerContainer>
  );
}

export default FollowerBox;
