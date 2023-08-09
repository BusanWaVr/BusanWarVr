import "./Home.css";
import styled from "styled-components";
import axios from "axios";
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
  async function hadlerTest() {
    const test = await axios.get("https://busanopenvidu.store/test");
    console.log(test);
  }

  return (
    <Main>
      <VideoContainer />
      <Container>
        <button onClick={hadlerTest}>count is</button>
        <TourRecoContainer />
        <DeadlineContainer />
        <GuideRecoContainer />
        <RegionContainer />
      </Container>
    </Main>
  );
};

export default Home;
