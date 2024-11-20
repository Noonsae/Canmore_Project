import styled from 'styled-components';
import { useEffect, useState } from 'react';
import supabase from '../supabase/supabase';

const TimeLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 8px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const RightContainer = styled.div`
  flex: 1;
  margin-left: 8px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Feed = styled.div`
  margin-bottom: 16px;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 8px;
  }
`;

const TimeLine = ({ userId }) => {
  console.log('Received userId:', userId);

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchMyFeeds = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      const userId = user.id;
      console.log('Authenticated userId:', userId);

      const { data, error: fetchError } = await supabase.from('posts').select('*').eq('user_id', userId);

      if (fetchError) {
        console.error('Error fetching feeds:', fetchError.message);
      } else {
        setFeeds(data);
      }
    };

    fetchMyFeeds();
  }, []);

  return (
    <TimeLineContainer>
      <LeftContainer>
        <RightContainer>
          <h2>내가 작성한 뉴스피드</h2>
          {feeds.length > 0 ? (
            feeds.map((feed, index) => (
              <Feed key={index}>
                <p>{feed.content}</p>
                {feed.image_url && <img src={feed.image_url} alt="첨부 이미지" />}
              </Feed>
            ))
          ) : (
            <p>작성한 뉴스피드가 없습니다.</p>
          )}
        </RightContainer>
      </LeftContainer>
    </TimeLineContainer>
  );
};

export default TimeLine;
