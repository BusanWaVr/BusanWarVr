import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TourReviewCard from "./TourReviewCard";

const Container = styled.div`
  //   height: 500px;
  // background-color: #999999;
`;

function ReviewContainer({ reviewData }) {
  return (
    <Container>
      <TourReviewCard reviewData={reviewData} />
    </Container>
  );
}

export default ReviewContainer;
