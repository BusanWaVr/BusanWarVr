import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function FollowingCard({ followingData }) {
  return (
    <div>
      <p>
        총 <strong>{followingData.length}</strong>명의 가이드를 팔로우하고
        있어요.
      </p>
      {followingData.map((Following) => (
        <CardContainer key={Following.Id}>
          <Link to={`/guide/${Following.Id}/detail`}>
            <span> {Following.nickname}</span>
          </Link>
          <p>팔로워 : {Following.follower}</p>
          <p>투어수 : {Following.tourNumbers}</p>
        </CardContainer>
      ))}
    </div>
  );
}

export default FollowingCard;
