// import React from 'react'
import { useState } from 'react';

function LikeButton({toggleLike,postId}) {
  const [likes, setLikes] = useState({}); // 사용자 ID를 키로 하는 객체로 초기화.
  const userId = 'user1'; // 예시로 사용자 ID를 지정합니다. 실제로는 로그인한 사용자의 ID를 사용.

  const addLike = () => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [userId]: (prevLikes[userId] || 0) + 1 // 이전 좋아요 수에 1을 +.
    }));
    toggleLike(postId); // 북마크 추가 함수 호출
  };

  const removeLike = () => {
    setLikes((prevLikes) => {
      const currentLikes = prevLikes[userId] || 0;
      return {
        ...prevLikes,
        [userId]: currentLikes > 0 ? currentLikes - 1 : 0 // 현재 좋아요 수가 0보다 클 때만 감소합니다.
      };
    });
    toggleLike(postId); // 북마크 제거 함수 호출
  };

  const totalLikes = Object.values(likes).reduce((acc, count) => acc + count, 0); // 총 좋아요 수 계산

  return (
    <div>
      <h3>LikeButton</h3>
      <button onClick={likes[userId] ? removeLike : addLike}>(❤️{totalLikes})</button>
    </div>
  );
}

export default LikeButton;
