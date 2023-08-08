import styled from "styled-components";

const Container = styled.div`
  height: 450px;
  width: 100%;
  background-image: url("https://datacdn.ibtravel.co.kr/files/2023/05/30164337/%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B2_%E1%84%87%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB-1.png");
  background-repeat: no-repeat;
  background-size: cover;
  `;

function VideoContainer() {
  return (
    <Container>
      <h1>메인화면 동영상</h1>
    </Container>
  );
}

export default VideoContainer;
