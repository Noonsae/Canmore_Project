import { useState, useRef } from "react";
import { useFeed } from "../context/FeedContext";

const PostForm = () => {
  const { addPost } = useFeed();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null); // 파일 입력 필드 참조

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    // 알림창으로 저장 여부 확인
    const confirmSave = window.confirm("뉴스피드를 저장하시겠습니까?");
    if (!confirmSave) return;

    const newPost = {
      id: Date.now(),
      content,
      image_url: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toLocaleString(),
      comments: [],
    };

    addPost(newPost); // FeedContext로 뉴스피드 추가
    setContent(""); // 입력 초기화
    setImage(null); // 이미지 상태 초기화
    fileInputRef.current.value = ""; // 파일 입력 필드 초기화
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
        ref={fileInputRef} // 파일 입력 필드 참조 연결
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">작성</button>
    </form>
  );
};

export default PostForm;
