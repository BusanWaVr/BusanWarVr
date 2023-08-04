import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function FollowerCard({ followerData }) {
  return (
    <div>
      {followerData.length === 0 ? (
        <p>로딩중ㅎ</p>
      ) : (
        <p>
          총 <strong>{followerData.length}</strong>명의 가이드를 팔로우하고
          있어요.
        </p>
      )}

      {followerData.map((follower) => (
        <CardContainer key={follower.userId}>
          <img
            src={follower.profileImg}
            alt="프로필 이미지"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
          />
          <br />
          <Link to={`/guide/${follower.userId}/detail`}>
            <span> {follower.nickname}</span>
          </Link>
        </CardContainer>
      ))}
    </div>
  );
}

export default FollowerCard;
