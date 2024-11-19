import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Y2kScroll = () => {
  const [index, setIndex] = useState(3);
  const [feeds, setFeeds] = useState(Array.from({ length: 4 }, (_, index) => `피드 ${index + 1}`));
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1.0 // 100% 보일 때
  });

  const loadMoreFeeds = () => {
    if (loading) return; // 로딩 중이면 추가 로드 방지
    setLoading(true);

    setTimeout(() => {
      setFeeds((prevFeeds) => [...prevFeeds, `피드 ${prevFeeds.length + 1}`]); //Db 연결부분
      setLoading(false);
    }, 1000); // 데이터를 가져오는 시간 시뮬레이션
  };

  useEffect(() => {
    //db에 있는 글목록 들어갈예정 목록 받아오기(인덱스로 레인지 조정)
    if (inView) {
      // loadMoreFeeds();  // 나중에 지워줄예정
      setIndex(index + 1);
    }
  }, [inView, index]);

  return (
    <div>
      <ul>
        {feeds.map((feed, index) => (
          <li key={index}>{feed}</li>
        ))}
      </ul>
      <div ref={ref} style={{ height: '20px', backgroundColor: 'lightgray' }}>
        {loading && <span>로딩 중...</span>}
      </div>
    </div>
  );
};

export default Y2kScroll;
