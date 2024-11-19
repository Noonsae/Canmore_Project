import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import FollowerBox from './FollowerBox';

Modal.setAppElement('#root');

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PhotoContainer = styled.div`
  position: relative;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const EditPhotoButton = styled.button`
  position: absolute;
  top: 10px;
  right: 60px;
  background-color: #4267b2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #365899;
  }
`;
const DeletePhotoButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px; /* 삭제 버튼의 위치 */
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const BioContainer = styled.div`
  position: relative;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const BioText = styled.p`
  font-size: 1rem;
  color: #4b4f56;
`;

const EditBioButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #4267b2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #365899;
  }
`;

// const DeletePhotoButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background-color: #dc3545;
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #c82333;
//   }
// `;

const FollowerContainer = styled.div`
  background: #fff;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FollowerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const FollowerCard = styled.div`
  text-align: center;
`;

const FollowerImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const FollowerName = styled.p`
  font-size: 0.9rem;
  color: #4b4f56;
`;

const ViewMoreButton = styled.button`
  margin-top: 1rem;
  background-color: #4267b2;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #365899;
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
  }

  textarea {
    resize: none;
    height: 100px;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
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
  background: #f7f7f7;
  cursor: pointer;

  &:hover {
    background: #e7e7e7;
  }
`;

function ProfileBox() {
  const navigate = useNavigate();

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/300');
  const [bio, setBio] = useState('안녕하세요! 자기소개를 입력하세요.');

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

  const handleSavePhoto = () => {
    const imageInput = document.getElementById('profile-image-input').value;
    if (imageInput) {
      setProfileImage(imageInput);
    }
    setIsPhotoModalOpen(false);
  };
  const handleDeletePhoto = () => {
    setProfileImage('https://via.placeholder.com/300'); // 디폴트 이미지로 복원
  };

  const handleSaveBio = () => {
    const bioInput = document.getElementById('profile-bio-input').value;
    if (bioInput) {
      setBio(bioInput);
    }
    setIsBioModalOpen(false);
  };

  const handleFollowerClick = (id) => {
    navigate(`/user/${id}`);
    setIsFollowerModalOpen(false);
  };

  return (
    <ProfileContainer>
      {/* 사진 영역 */}
      <PhotoContainer>
        <ProfileImage src={profileImage} alt="프로필 사진" />
        <EditPhotoButton onClick={() => setIsPhotoModalOpen(true)}>수정</EditPhotoButton>
        <DeletePhotoButton onClick={handleDeletePhoto}>삭제</DeletePhotoButton>
      </PhotoContainer>
      <Modal isOpen={isPhotoModalOpen} onRequestClose={() => setIsPhotoModalOpen(false)}>
        <ModalContent>
          <h2>사진 수정</h2>
          <input id="profile-image-input" type="text" defaultValue={profileImage} />
          <SaveButton onClick={handleSavePhoto}>저장</SaveButton>
          <CancelButton onClick={() => setIsPhotoModalOpen(false)}>취소</CancelButton>
        </ModalContent>
      </Modal>

      {/* 자기소개 영역 */}
      <BioContainer>
        <BioText>{bio}</BioText>
        <EditBioButton onClick={() => setIsBioModalOpen(true)}>수정</EditBioButton>
      </BioContainer>
      <Modal isOpen={isPhotoModalOpen} onRequestClose={() => setIsPhotoModalOpen(false)}>
        <ModalContent>
          <h2>사진 수정</h2>
          <input id="profile-image-input" type="text" defaultValue={profileImage} />
          <SaveButton onClick={handleSavePhoto}>저장</SaveButton>
          <CancelButton onClick={() => setIsPhotoModalOpen(false)}>취소</CancelButton>
        </ModalContent>
      </Modal>

      {/* 자기소개 수정 모달 */}
      <Modal isOpen={isBioModalOpen} onRequestClose={() => setIsBioModalOpen(false)}>
        <ModalContent>
          <h2>자기소개 수정</h2>
          <textarea id="profile-bio-input" defaultValue={bio} />
          <SaveButton onClick={handleSaveBio}>저장</SaveButton>
          <CancelButton onClick={() => setIsBioModalOpen(false)}>취소</CancelButton>
        </ModalContent>
      </Modal>

      {/* 팔로워 목록 모달 */}
      <Modal isOpen={isFollowerModalOpen} onRequestClose={() => setIsFollowerModalOpen(false)}>
        <ModalContent>
          <h2>팔로워 목록</h2>
          <FollowerList>
            {followers.map((follower) => (
              <FollowerItem key={follower.id} onClick={() => handleFollowerClick(follower.id)}>
                {follower.name}
              </FollowerItem>
            ))}
          </FollowerList>
        </ModalContent>
      </Modal>
    </ProfileContainer>
  );
}

export default ProfileBox;
