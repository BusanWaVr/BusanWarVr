// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import styled from "styled-components";

import RegionCard from "../../blocks/RegionCard";

const Container = styled.div`
  height: 500px;
  // background-color: #999999;
`;

const MentionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  // background-color: #565656;
`;

function RegionContainer() {
  return (
    <Container>
      <MentionsContainer></MentionsContainer>
      <RegionCard />
    </Container>
  );
}

export default RegionContainer;
