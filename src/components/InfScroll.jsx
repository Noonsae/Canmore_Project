import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import supabase from '../supabase/Supabase';

const InfScroll = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 1.0 });
  const [index, setIndex] = useState(0);

  const getFeeds = async (index) => {
    if (loading) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('posts') // 'feeds'는 Supabase에서 생성한 테이블 이름입니다.
      .select('*')
      .range(index, index + 3); // 4개씩 가져오기  게시물 숫자 통일

    if (error) {
      console.error('Error loading feeds:', error.message);
    } else {
      setFeeds((prevFeeds) => [...prevFeeds, ...data]); //기존데이터에 새로운데이터 추가
    }

    setLoading(false);
  };
  console.log(index);

  useEffect(() => {
    getFeeds(index);
  }, [index]);

  useEffect(() => {
    if (inView) {
      setIndex((prev) => prev + 4);
    }
  }, [inView]);

  return (
    <div>
      <ul>
        {feeds.map((feed, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <p>{feed.content}</p>
            {feed.image_url && <img src={feed.image_url} alt="첨부 이미지" style={{ maxWidth: '100%' }} />}
          </div> // feed.content는 피드 내용이 저장된 필드입니다.
        ))}
      </ul>
      <div ref={ref} style={{ height: '20px', backgroundColor: 'lightgray' }}>
        {loading && <span>로딩 중...</span>}
      </div>
    </div>
  );
};

export default InfScroll;
