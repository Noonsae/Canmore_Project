import { useFeed } from "../context/FeedContext";
import PostForm from "../components/PostForm";

const FeedPage = () => {
  const { addPost } = useFeed();

  return (
    <div>
      <h1>글쓰기</h1>
      <PostForm onAddPost={addPost} />
    </div>
  );
};

export default FeedPage;