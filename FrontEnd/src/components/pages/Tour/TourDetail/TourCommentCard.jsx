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

function TourCommentCard() {
  return (
    <CardContainer>
      {/* 여기에 각 데이터 매핑 */}
      <Card>
        <p>누가댓글만들자고했냐?</p>
      </Card>
    </CardContainer>
  );
}

export default TourCommentCard;
