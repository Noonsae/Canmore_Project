import { useFeed } from "../context/FeedContext";

const NewsFeed = () => {
  const { feeds } = useFeed();

  return (
    <div>
      <h2>전체 뉴스피드</h2>
      {feeds.length > 0 ? (
        feeds.map((feed, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <p>{feed.content}</p>
            {feed.image_url && <img src={feed.image_url} alt="첨부 이미지" style={{ maxWidth: "100%" }} />}
          </div>
        ))
      ) : (
        <p>뉴스피드가 없습니다.</p>
      )}
    </div>
  );
};

export default NewsFeed;
