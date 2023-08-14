import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  //   margin: 20px;
`;

const Card = styled.div`
  margin: 20px;
  width: 200px;
  height: 350px;
`;

function TourReviewCard({ reviewData }) {
  return (
    <CardContainer>
      {reviewData ? (
        reviewData.length > 0 ? (
          reviewData.map((review) => (
            <Card key={review.content}>
              <h2>{review.nickname}</h2>
              <h2>{review.title}</h2>
              <h3>{review.score}</h3>
              <div dangerouslySetInnerHTML={{ __html: review.content }} />
              <p>{review.date}</p>
            </Card>
          ))
        ) : (
          <p>아직 작성된 리뷰가 없습니다.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </CardContainer>
  );
}

export default TourReviewCard;
