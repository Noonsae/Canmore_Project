
import { useFeed } from '../context/FeedContext';
import PostForm from '../components/PostForm';


const FeedPage = ({userId}) => {
  const { addPost } = useFeed();

  return (
    <div>
      <h1>글쓰기</h1>
      <PostForm onAddPost={addPost} userId={userId}/>
    </div>
  );
};

export default FeedPage;