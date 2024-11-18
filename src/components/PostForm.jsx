import { useState } from "react";
import { useFeed } from "../context/FeedContext";

const PostForm = () => {
  const { addPost } = useFeed(); 
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      alert("내용을 입력하세요.");
      return;
    }

    const newPost = {
      content,
      image_url: image ? URL.createObjectURL(image) : null,
      createdAt: new Date(),
    };

    addPost(newPost); 
    setContent("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="뉴스피드를 작성하세요"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">작성</button>
    </form>
  );
};

export default PostForm;
