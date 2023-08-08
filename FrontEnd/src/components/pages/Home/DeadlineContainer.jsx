import styled from "styled-components";

const Container = styled.div`
  height: 300px;
  background-color: #aaaaaa;
`;

function DeadlineContainer() {
  return (
    <Container>
      <h1>마감임박</h1>
    </Container>
  );
}

export default DeadlineContainer;
