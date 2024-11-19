import React, { useState, useEffect } from 'react';
import supabase from '../supabase/Supabase';
import LikeButton from '../components/LikeButton'; // LikeButton 가져오기

const Bookmark = () => {
  const [likedImages, setLikedImages] = useState([]); // 좋아요한 게시물 데이터
  const userId = 'd860bab7-4d63-4aa9-aa75-d6b100d03c37'; // 사용자 ID(user3을 써서 구현한거라 나중에 해당 유저값으로 수정해야함)

  // 좋아요한 게시물 가져오기
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        // 좋아요한 post_id 가져오기
        const { data: likesData, error: likesError } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', userId);

        if (likesError) {
          console.error('Error fetching likes:', likesError.message);
          return;
        }

        const likedPostIds = likesData.map((like) => like.post_id);

        // 좋아요한 게시물의 이미지 가져오기
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

  // 좋아요 토글 함수
  const toggleLike = async (postId) => {
    const isLiked = likedImages.some((post) => post.id === postId);

    try {
      if (isLiked) {
        // 좋아요 해제
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', userId)
          .eq('post_id', postId);

        if (error) {
          console.error('Error:', error.message);
          return;
        }

        setLikedImages((prev) => prev.filter((post) => post.id !== postId));
      } else {
        // 좋아요 추가
        const { error } = await supabase.from('likes').insert({
          user_id: userId,
          post_id: postId,
        });

        if (error) {
          console.error('Error:', error.message);
          return;
        }

        // 새로 추가된 좋아요한 게시물 데이터 가져오기
        const { data: newPostData, error: postError } = await supabase
          .from('posts')
          .select('id, image_url')
          .eq('id', postId);

        if (postError) {
          console.error('Error:', postError.message);
          return;
        }

        setLikedImages((prev) => [...prev, ...newPostData]);
      }
    } catch (error) {
      console.error('Unexpected error while toggling like:', error);
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
              textAlign: 'center',
            }}
          >
            <img
              src={post.image_url}
              alt="Liked Post"
              style={{ width: '100px', height: '100px' }}
            />
            <LikeButton
              postId={post.id}
              isLiked={true} // 좋아요 상태 전달
              toggleLike={toggleLike} // toggleLike 함수 전달
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmark;
