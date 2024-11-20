import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import supabase from '../supabase/supabase';

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

const SearchBar = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
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

function FollowerBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  const fetchFollowers = async () => {
    const { data, error } = await supabase.from('users').select('*').order('create_at', { ascending: false });

    if (error) {
      console.error('유저 데이터를 가져오는 중 오류 발생:', error);
    } else {
      setFollowers(data);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  const handleFollowerClick = (id) => {
    navigate(`/user/${id}`);
    setIsModalOpen(false);
  };

  const filteredFollowers = followers.filter((follower) =>
    follower.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FollowerContainer>
      <FollowerGrid>
        {followers.slice(0, 6).map((follower) => (
          <FollowerCard key={follower.id} onClick={() => handleFollowerClick(follower.id)}>
            <FollowerImage src={follower.profile || 'https://via.placeholder.com/80'} alt={follower.nickname} />
            <FollowerName>{follower.nickname}</FollowerName>
          </FollowerCard>
        ))}
      </FollowerGrid>

      <ViewMoreButton onClick={() => setIsModalOpen(true)}>팔로워 목록 보기</ViewMoreButton>

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
          <SearchBar
            type="text"
            placeholder="유저 이름 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FollowerList>
            {filteredFollowers.map((follower) => (
              <FollowerItem key={follower.id} onClick={() => handleFollowerClick(follower.id)}>
                {follower.nickname} (가입일: {new Date(follower.create_at).toLocaleDateString()})
              </FollowerItem>
            ))}
          </FollowerList>
        </ModalContent>
      </Modal>
    </FollowerContainer>
  );
}

export default FollowerBox;
