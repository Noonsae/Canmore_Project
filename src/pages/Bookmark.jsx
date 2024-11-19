import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/Supabase';
import LikeButton from '../components/LikeButton'; // LikeButton 가져오기

const Bookmark = () => {
  const [posts, setPosts] = useState([]); // 게시물 데이터
  const [bookmarks, setBookmarks] = useState([]); // 북마크된 게시물 ID

  //   const userId = "user1";

  // Supabase에서 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        console.error('Error:', error.message);
        return;
      }

      setPosts(data);

      // 북마크 상태 초기화
      const userId = 'user1'; // 현재 사용자의 ID
      const initialBookmarks = data.filter((post) => post.bookmarked_users?.includes(userId)).map((post) => post.id);
      setBookmarks(initialBookmarks);
    };

    fetchPosts();
  }, []);

  // 북마크 토글
  const toggleLike = async (postId) => {
    const isBookmarked = bookmarks.includes(postId);

    // 클라이언트 상태 업데이트
    setBookmarks((prev) => (isBookmarked ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '1px solid black',
            margin: '10px',
            padding: '10px',
            textAlign: 'center'
          }}
        >
          <img src={post.img_url} alt={post.content} style={{ width: '100px', height: '100px' }} />
          <p>{post.content}</p>
          <LikeButton
            postId={post.id}
            toggleLike={toggleLike} // LikeButton에 toggleLike 전달
          />
        </div>
      ))}

      <h2>Bookmarked Posts</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarks.map((postId) => {
          const post = posts.find((p) => p.id === postId);
          return (
            <div
              key={post.id}
              style={{
                border: '1px solid black',
                margin: '10px',
                textAlign: 'center'
              }}
            >
              <img src={post.img_url} alt={post.content} style={{ width: '100px', height: '100px' }} />
              <p>{post.content}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Bookmark;
