import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TourCommentCard from "./TourCommentCard";

const Container = styled.div`
  //   height: 500px;
  // background-color: #999999;
`;

function CommentContainer() {
  return (
    <Container>
      <TourCommentCard />
    </Container>
  );
}

export default CommentContainer;
