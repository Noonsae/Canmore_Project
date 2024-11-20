import { useState, useEffect } from 'react';
import supabase from '../supabase/Supabase';

function LikeButton({ postId, onLikeChange }) {
  const [isLiked, setIsLiked] = useState(false); // 현재 포스트의 좋아요 상태
  const [totalLikes, setTotalLikes] = useState(0); // 총 좋아요 수
  const userId = '02e932e7-8772-4362-930e-19dac8805d20'; // 사용자 ID

  // 초기 좋아요 상태 확인
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', userId)
          .eq('post_id', postId);

        if (error) {
          console.error('Error fetching like status:', error.message);
          return;
        }

        setIsLiked(data.length > 0);
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchLikeStatus();
  }, [postId, userId]);

  // 좋아요 추가
  const addLike = async () => {
    try {
      const { error } = await supabase.from('likes').insert({
        user_id: userId,
        post_id: postId,
      });

      if (error) {
        console.error('Error adding like:', error.message);
        return;
      }

      setIsLiked(true);
      setTotalLikes((prev) => prev + 1);
      onLikeChange(true); // 부모 컴포넌트에 좋아요 상태 전달
    } catch (err) {
      console.error('Unexpected error adding like:', err);
    }
  };

  // 좋아요 해제
  const removeLike = async () => {
    try {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId);

      if (error) {
        console.error('Error removing like:', error.message);
        return;
      }

      setIsLiked(false);
      setTotalLikes((prev) => Math.max(0, prev - 1));
      onLikeChange(false); // 부모 컴포넌트에 좋아요 상태 전달
    } catch (err) {
      console.error('Unexpected error removing like:', err);
    }
  };

  return (
    <div>
      <button onClick={isLiked ? removeLike : addLike}>
        {isLiked ? `♥ ${totalLikes}` : `♡ ${totalLikes}`}
      </button>
    </div>
  );
}

export default LikeButton;
