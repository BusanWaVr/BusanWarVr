import "./Home.css";
import styled from "styled-components";

import VideoContainer from "./VideoContainer";
import TourRecoContainer from "./TourRecoContainer";
import DeadlineContainer from "./DeadlineContainer";
import GuideRecoContainer from "./GuideRecoContainer";
import RegionContainer from "./RegionContainer";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  width: 80%;
`;
const Home: React.FC = () => {
  return (
    <Main>
      <VideoContainer />
      <Container>
        <TourRecoContainer />
        <DeadlineContainer />
        <GuideRecoContainer />
        <RegionContainer />
      </Container>
    </Main>
  );
};

export default Home;
