import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setCommentData } from "./TourDetailReducer";

// import TourRecoCard from "../../blocks/TourRecoCard";

const Container = styled.div`
  height: 500px;
  // background-color: #999999;
`;

// const MentionsContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 50px;
//   // background-color: #565656;
// `;

function CommentContainer() {
  const dispatch = useDispatch();
  const { commentData } = useSelector((state) => state.liveStream);
  return (
    <Container>
      <h1>댓글</h1>
    </Container>
  );
}

export default CommentContainer;
