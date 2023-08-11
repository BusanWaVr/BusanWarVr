import styled from "styled-components";
import ReactPlayer from "react-player";

const Container = styled.div`
  pointer-events: none;
  height: 450px;
  width: 100%;
  overflow: hidden;
  & iframe {
    transform: translate(0, -160px) scale(1.5);
  }
`;

function VideoContainer() {
  return (
    <Container>
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=Ooh3IAeInws"}
        width="100vw"
        height="100vh"
        loop={true}
        playing={true}
        muted={true}
        controls={false}
        playbackRate={4}
      />
    </Container>
  );
}

export default VideoContainer;
