import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/supabase';
import { UserContext } from '../context/userContext';

function LikeButton({ postId, initialLikeCount, onLikeChange }) {
  const { user_id } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);

  useEffect(() => {
    if (!user_id) return;

    const fetchLikeStatus = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', user_id)
        .eq('post_id', postId);

      if (error) {
        console.error('Error fetching like status:', error);
        return;
      }

      setIsLiked(data.length > 0);
    };

    fetchLikeStatus();
  }, [postId, user_id]);

  const toggleLike = async () => {
    if (!user_id) return;

    try {
      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', user_id)
          .eq('post_id', postId);

        if (error) throw error;

        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
        onLikeChange(postId, false);
      } else {
        const { error } = await supabase.from('likes').insert({
          user_id,
          post_id: postId,
        });

        if (error) throw error;

        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        onLikeChange(postId, true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button onClick={toggleLike}>
      {isLiked ? `♥ ${likeCount}` : `♡ ${likeCount}`}
    </button>
  );
}

export default LikeButton;
