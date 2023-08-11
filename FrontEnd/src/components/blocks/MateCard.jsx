import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function MateCard({ mateData }) {
  return (
    <>
      {mateData.map((mate) => (
        <CardContainer key={mate.mateId}>
          <h3>
            <Link to={`/matedetail/${mate.mateId}`}>{mate.title}</Link>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: mate.content }} />
          <p>
            참가인원: {mate.joinMember}/{mate.maxMember}
          </p>
        </CardContainer>
      ))}
    </>
  );
}

export default MateCard;