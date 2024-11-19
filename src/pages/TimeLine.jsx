import styled from "styled-components";
import { useFeed } from "../context/FeedContext";

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

const TimeLine = () => {
const { myFeeds, feeds } = useFeed();

return (
    <TimeLineContainer>
    <LeftContainer>
        <h2>내가 작성한 뉴스피드</h2>
        {myFeeds.length > 0 ? (
        myFeeds.map((feed, index) => (
            <Feed key={index}>
            <p>{feed.content}</p>
            {feed.image_url && <img src={feed.image_url} alt="첨부 이미지" />}
            </Feed>
        ))
        ) : (
        <p>작성한 뉴스피드가 없습니다.</p>
        )}
    </LeftContainer>

    <RightContainer>
        <h2>최근 뉴스피드</h2>
        {feeds.length > 0 ? (
        feeds.map((feed, index) => (
            <Feed key={index}>
            <p>{feed.content}</p>
            {feed.image_url && <img src={feed.image_url} alt="첨부 이미지" />}
            </Feed>
        ))
        ) : (
        <p>뉴스피드가 없습니다.</p>
        )}
    </RightContainer>
    </TimeLineContainer>
);
};

export default TimeLine;