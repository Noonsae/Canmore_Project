import { useState, useEffect } from 'react';
import supabase from '../supabase/supabase';
import LikeButton from '../CommonCompontes/LikeButton';

const Bookmark = () => {
  const [likedImages, setLikedImages] = useState([]); // 좋아요한 게시물 데이터
  const userId = '02e932e7-8772-4362-930e-19dac8805d20'; // 사용자 ID

  // 좋아요한 게시물 가져오기
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const { data: likesData, error } = await supabase.from('likes').select('post_id').eq('user_id', userId);

        if (error) {
          console.error('Error:', error.message);
          return;
        }

        const likedPostIds = likesData.map((like) => like.post_id);

        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('id, image_url')
          .in('id', likedPostIds);

        if (postsError) {
          console.error('Error:', postsError.message);
          return;
        }

        setLikedImages(postsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLikedPosts();
  }, []);

  // 좋아요 상태 변경 핸들러
  const handleLikeChange = (postId, isLiked) => {
    if (isLiked) {
      // 좋아요 추가된 경우
      setLikedImages((prev) => [...prev, likedImages.find((post) => post.id === postId)]);
    } else {
      // 좋아요 해제된 경우
      setLikedImages((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  return (
    <div>
      <h2>Liked Posts</h2>
      {likedImages.length === 0 ? (
        <p>No liked posts yet.</p>
      ) : (
        likedImages.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid black',
              margin: '10px',
              padding: '10px',
              textAlign: 'center'
            }}
          >
            <img src={post.image_url} alt="Liked Post" style={{ width: '100px', height: '100px' }} />
            <LikeButton postId={post.id} onLikeChange={(isLiked) => handleLikeChange(post.id, isLiked)} />
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmark;
