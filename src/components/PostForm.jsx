import { useState, useRef } from "react";
import { useFeed } from "../context/FeedContext";

const PostForm = () => {
  const { addPost } = useFeed();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    // 이미지 파일 URL 생성
    const imageUrl = image ? URL.createObjectURL(image) : null;

    const newPost = {
      id: Date.now(),
      userName: "로그인한 사용자", // 예시 사용자 이름
      content,
      image_url: imageUrl, // 이미지 URL 저장
      createdAt: new Date().toLocaleString(),
      comments: [],
      likes: [],
    };

    addPost(newPost); // FeedContext에 추가
    setContent(""); // 입력 초기화
    setImage(null); // 이미지 초기화
    fileInputRef.current.value = ""; // 파일 필드 초기화
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
        ref={fileInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">작성</button>
    </form>
  );
};

export default PostForm;
