import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function WishCard({ wishData }) {
  return (
    <div>
      {wishData.map((wish) => (
        <CardContainer key={wish.tourId}>
          <Link to={`/tour/${wish.tourId}`}>
            <h2>{wish.title}</h2>
          </Link>
          <span>가이드 :</span>
          <Link to={`/guide/${wish.guide.id}/detail`}>
            <span> {wish.guide.name}</span>
          </Link>
          <p>시작 날짜 : {wish.startDate}</p>
          <p>카테고리 : #{wish.category.join(" #")}</p>
          <strong>
            {wish.currentMember}/{wish.maxMember}
          </strong>
        </CardContainer>
      ))}
    </div>
  );
}

export default WishCard;
