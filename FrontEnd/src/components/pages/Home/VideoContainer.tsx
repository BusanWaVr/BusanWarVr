import styled from "styled-components";

const Container = styled.div`
  height: 400px;
  width: 100%;
  background-color: #f0f0f0;
`;

function VideoContainer() {
  return (
    <Container>
      <h1>메인화면 동영상</h1>
    </Container>
  );
}

export default VideoContainer;
