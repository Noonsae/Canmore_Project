import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/Supabase";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("사용자 정보가 확인되지 않습니다. 다시 로그인해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = null;

      // 이미지 파일 업로드
      if (image) {
        console.log(image);
        const fileName = `post/_${Date.now()}_${image.name}`;
        const { data: uploadData ,error: storageError } = await supabase.storage

          .from("images")
          .upload(fileName, image);
        console.log(uploadData);
        if (storageError) throw storageError;

        const { data: publicURL , error: publicURLError } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        if (publicURLError) throw publicURLError;
        console.log(publicURL);
        imageUrl = publicURL;
      }
      // 뉴스피드 데이터 Supabase에 업로드
      const { error } = await supabase.from("posts").insert([
        {
          user_id: userId, 
          content,
          image_url: imageUrl,
          create_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      alert("뉴스피드가 성공적으로 작성되었습니다!");
      navigate("/HomePage");
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("뉴스피드 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }

    setContent("");
    setImage(null);
    fileInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="뉴스피드를 작성하세요"
        disabled={loading}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "작성 중..." : "작성"}
      </button>
    </form>
  );
};

export default PostForm;
