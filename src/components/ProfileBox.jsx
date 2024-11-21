import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import supabase from '../supabase/supabase';

Modal.setAppElement('#root');

// 공통 버튼 스타일
const BaseButton = styled.button`
  border: 3px solid #eee;
  border-right-color: #aaa;
  border-bottom-color: #aaa;
  cursor: pointer;
`;

const EditPhotoButton = styled(BaseButton)`
  position: absolute;
  top: 10px;
  right: 60px;
  background-color: #eee;
  color: #050505;

  &:hover {
    background-color: #aaa;
    color: #050505;
  }
`;

const DeletePhotoButton = styled(BaseButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #eee;
  color: #050505;

  &:hover {
    background-color: #aaa;
    color: #050505;
  }
`;

const EditBioButton = styled(BaseButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #eee;
  color: #050505;

  &:hover {
    background-color: #aaa;
    color: #050505;
  }
`;

const SaveButton = styled(BaseButton)`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;


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
  const userId = '01c8403c-658a-4a17-879d-42bc40119892';
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [file,setFile]=useState();
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/300');
  const [bio, setBio] = useState('안녕하세요! 자기소개를 입력하세요.');

  const followers = [{ id: 1, name: '유저_01', image: 'https://via.placeholder.com/80', joinedAt: '2023-11-03' }].sort(
    (a, b) => new Date(b.joinedAt) - new Date(a.joinedAt)
  ); // 최근 가입 순으로 정렬

  const handleFollowerClick = (id) => {
    navigate(`/user/${id}`);
    setIsFollowerModalOpen(false);
  };
  useEffect(() => {
    //연동
    const fetchProfile = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      const { data, error } = await supabase.from('users').select('profile, introduce').eq('id', userId).single();
      if (error) {
        console.error('데이터 가져오기 오류!', error);
      } else {
        setProfileImage(data.profile || 'https://via.placeholder.com/300');
        setBio(data.introduce || '안녕하세요! 자기소개를 입력하세요.');
      }
    };
    fetchProfile();
  }, [userId]);

  //사진 업데이트
  const handleSavePhoto = async () => {
    const { error: uploadError, data } = await supabase.storage
      .from('images')
      .upload(`profile/${Date.now()}.png`, file);
    if (uploadError) {
      console.error('사진업데이트 오류:', error);
      return;
    }
    const { error: updateError } = await supabase
      .from('users')
      .update({
        profile: `https://mvkaxrrdnpmnqqqzkcmi.supabase.co/storage/v1/object/public/images/${data.path}`
      })
      .eq('id', userId);
      if (updateError) {
      console.error('오류:', error);
      return;
      }
      setProfileImage(`https://mvkaxrrdnpmnqqqzkcmi.supabase.co/storage/v1/object/public/images/${data.path}`)
  }; 

  const handleDeleteClick = async (userId) => {
    const { error } = await supabase.from('users').update({profile:null}).eq('id', userId);
    if (error) {
      return alert(error.message);
    }
    setProfileImage('https://via.placeholder.com/300');
  };


  // 자기소개 업데이트
  const handleSaveBio = async () => {
    const { error } = await supabase.from('users').update({ introduce: bio }).eq('id', userId);
    if (error) {
      console.error('자기소개 업데이트 오류:', error);
      return;
    }

    console.log('자기소개 업데이트 성공');
    setIsBioModalOpen(false); // 모달 닫기
  }; // 조건: id가 userId와 동일한 행만 업데이트

  return (
    <ProfileContainer>
      <PhotoContainer>
        <ProfileImage src={profileImage} alt="프로필 사진" />
        <EditPhotoButton onClick={() => setIsPhotoModalOpen(true)}>수정</EditPhotoButton>
        <DeletePhotoButton onClick={()=>handleDeleteClick(userId)}>삭제</DeletePhotoButton>
  
        {/* //삭제버튼 생성해야함 */}
      </PhotoContainer>
      <Modal isOpen={isPhotoModalOpen} onRequestClose={() => setIsPhotoModalOpen(false)}>
        <ModalContent>
          <h2>사진 수정</h2>
          <input id="profile-image-input" type="file"  onChange={(e) => setFile(e.target.files[0])} />
          <SaveButton onClick={handleSavePhoto}>저장</SaveButton>
          <CancelButton onClick={() => setIsPhotoModalOpen(false)}>취소</CancelButton>
        </ModalContent>
      </Modal>
      {/* 자기소개 영역 */}
      <BioContainer>
        <BioText>{bio}</BioText>
        <EditBioButton onClick={() => setIsBioModalOpen(true)}>수정</EditBioButton>
      </BioContainer>
      {/* 자기소개 수정 모달 */}
      <Modal isOpen={isBioModalOpen} onRequestClose={() => setIsBioModalOpen(false)}>
        <ModalContent>
          <h2>자기소개 수정</h2>
          <textarea id="profile-bio-input" value={bio} onChange={(e) => setBio(e.target.value)} />
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
