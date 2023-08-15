import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Avatar, Card } from "antd";
import BoogieNone from "../../assets/boogie_none.png";
import { useI18n } from "../../hooks/useI18n"

const { Meta } = Card;

const CardContainer = styled.div`
  margin: 50px;
`;

function FollowerCard({ followerData }) {
  const t = useI18n()
  return (
    <div className="h-full">
      {followerData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full opacity-50">
          <img src={BoogieNone} alt="no_follower" className="w-1/6" />
          <p className="font-bold">{t(`팔로워가 없어요 :(`)}</p>
        </div>
      ) : (
        <div className="my-4">
          <p>
            총 <strong>{followerData.length}</strong>명의 팔로워가 있어요.
          </p>
        </div>
      )}
      <div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {followerData.map((follower) => (
            <Card key={follower.userId} style={{ margin: "10px" }}>
              <Link to={`/user/${follower.userId}/mypage`}>
                <Meta
                  className="items-center"
                  avatar={<Avatar src={follower.profileImg} size="large" />}
                  title={follower.nickname}
                />{" "}
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowerCard;
