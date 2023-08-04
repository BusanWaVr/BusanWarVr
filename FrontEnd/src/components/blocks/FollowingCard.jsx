import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function FollowingCard({ followingData }) {
  return (
    <div>
      {followingData.length === 0 ? (
        <p>로딩중ㅎ(느림ㅎ 데이터 없을수도 있음)</p>
      ) : (
        <p>
          총 <strong>{followingData.length}</strong>명의 가이드를 팔로우하고
          있어요.
        </p>
      )}

      {followingData.map((Following) => (
        <CardContainer key={Following.id}>
          <img
            src={Following.imageUrl}
            alt="프로필 이미지"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
          />
          <br />
          <Link to={`/guide/${Following.id}/detail`}>
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
