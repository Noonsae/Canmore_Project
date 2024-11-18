import PostForm from "../components/PostForm";
import NewsFeed from "../components/NewsFeed";

// 테스트용 페이지, 추후 지현님 코드에 붙일 예정이긔요미
const FeedPage = () => {
  return (
    <div>
      <PostForm />
      <NewsFeed />
    </div>
  );
};

export default FeedPage;