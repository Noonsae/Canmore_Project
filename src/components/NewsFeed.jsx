import { useFeed } from '../context/FeedContext';
import LikeButton from '../components/LikeButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import InfScroll from '../components/InfScroll';

const NewsFeed = () => {
  const { feeds } = useFeed();
  const [likedPosts, setLikedPosts] = useState({});

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId] // 현재 좋아요 상태를 토글
    }));
  };

  return (
    <div>
      <h2>전체 뉴스피드</h2>
      {feeds.length > 0 ? (
        feeds.map((feed, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <p>{feed.content}</p>
            {feed.image_url && <img src={feed.image_url} alt="첨부 이미지" style={{ maxWidth: '100%' }} />}
            <LikeButton toggleLike={toggleLike} postId={feed.id} />

          
          </div>
        ))
      ) : (
        <p>뉴스피드가 없습니다.</p>
      )}
        <InfScroll />
      <ScrollToTopButton />
    </div>
  );
};

export default NewsFeed;
