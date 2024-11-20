import { createContext, useState, useContext } from "react";

const FeedContext = createContext(null); // 전역 상태 관리를 위한 Context API

export const useFeed = () => useContext(FeedContext);

export const FeedProvider = ({ children }) => {
  const [feeds, setFeeds] = useState([]);

  const addPost = (newPost) => {
    setFeeds((prevFeeds) => [newPost, ...prevFeeds]);
  };

  const addComment = (feedId, newComment) => { // 고유 ID와 댓글의 객체를 매개변수로 받고 있음
    setFeeds((prevFeeds) => // 기존 상태를 인자로 받음
      prevFeeds.map((feed) => // map을 활용하여 특정 feed를 찾아내는 로직
        feed.id === feedId
          ? { ...feed, comments: [...feed.comments, newComment] }
          : feed
      )
    );
  };

  const updatePost = (feedId, updatedContent) => {
    setFeeds((prevFeeds) =>
      prevFeeds.map((feed) =>
        feed.id === feedId ? { ...feed, content: updatedContent } : feed
      )
    );
  };

  const updateComment = (feedId, commentId, updatedData) => {
    setFeeds((prevFeeds) =>
      prevFeeds.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              comments: feed.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, ...updatedData }
                  : comment
              ),
            }
          : feed
      )
    );
  };

  const deletePost = (feedId) => {
    setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== feedId));
  };

  const deleteComment = (feedId, commentId) => {
    setFeeds((prevFeeds) =>
      prevFeeds.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              comments: feed.comments.filter((comment) => comment.id !== commentId),
            }
          : feed
      )
    );
  };

  return (
    <FeedContext.Provider
      value={{
        feeds,
        addPost,
        addComment,
        updatePost,
        updateComment,
        deletePost,
        deleteComment,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
