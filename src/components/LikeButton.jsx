import { useEffect, useState } from 'react';
import supabase from '../supabase/Supabase';

<<<<<<< HEAD
// Supabase 클라이언트 설정

function LikeButton({ toggleLike, postId }) {
  const [likes, setLikes] = useState({});
  const userId = 'd860bab7-4d63-4aa9-aa75-d6b100d03c37'; // 실제 사용자 ID로 대체해야 함.

  useEffect(() => {
    // 컴포넌트가 마운트될 때 좋아요 수를 가져옴
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('likes') // 'likes' 테이블에서
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching likes:', error);
      } else {
        const userLikes = data.length > 0 ? data[0].count : 0;
        setLikes({ [userId]: userLikes });
      }
    };

    fetchLikes();
  }, [postId]);

  const addLike = async () => {
    await supabase.from('likes').upsert({ post_id: postId, user_id: userId, count: (likes[userId] || 0) + 1 });
=======
function LikeButton({toggleLike,postId}) {
  const [likes, setLikes] = useState({}); // 사용자 ID를 키로 하는 객체로 초기화.
  const userId = 'd860bab7-4d63-4aa9-aa75-d6b100d03c37'; // 예시로 user3 을 썼음. 실제로는 로그인한 사용자의 ID를 사용해야함.
>>>>>>> 7b3f8e61ea371e43fa2ac3ffd96f037fbd183431

    setLikes((prevLikes) => ({
      ...prevLikes,
      [userId]: (prevLikes[userId] || 0) + 1
    }));
    toggleLike(postId);
  };

  const removeLike = async () => {
    await supabase
      .from('likes')
      .update({ count: Math.max((likes[userId] || 0) - 1, 0) })
      .eq('post_id', postId)
      .eq('user_id', userId);

    setLikes((prevLikes) => {
      const currentLikes = prevLikes[userId] || 0;
      return {
        ...prevLikes,
        [userId]: currentLikes > 0 ? currentLikes - 1 : 0
      };
    });
    toggleLike(postId);
  };

  const totalLikes = Object.values(likes).reduce((acc, count) => acc + count, 0);

  return (
    <div>
      <h3>LikeButton</h3>
      <button onClick={likes[userId] ? removeLike : addLike}>(❤️{totalLikes})</button>
    </div>
  );
}

export default LikeButton;



