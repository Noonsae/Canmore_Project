import { createContext, useState, useContext } from "react";

const FeedContext = createContext();

// Context를 사용하기 위한 커스텀 훅
export const useFeed = () => useContext(FeedContext);

export const FeedProvider = ({ children }) => {
  const [feeds, setFeeds] = useState([]); // 모든 뉴스피드 데이터
  const [myFeeds, setMyFeeds] = useState([]); // 내가 작성한 뉴스피드 데이터

  const addPost = (newPost) => {
    setFeeds((prevFeeds) => [newPost, ...prevFeeds]); // 전체 뉴스피드 업데이트
    setMyFeeds((prevMyFeeds) => [newPost, ...prevMyFeeds]); // 내가 작성한 뉴스피드 업데이트
  };

  return (
    <FeedContext.Provider value={{ feeds, myFeeds, addPost }}>
      {children}
    </FeedContext.Provider>
  );
};
