import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Card } from "antd";

const { Meta } = Card;

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
        <Card
          key={Following.id}
          style={{ width: 300 }}
          actions={[
            <Button danger>언팔로우</Button>,
          ]}
        >
          <Meta
            avatar={<Avatar src={Following.imageUrl} size="large" />}
            title={Following.nickname}
            description={`팔로워 ${Following.follower}ㅤ|ㅤ총 투어 ${Following.tourNumbers}`}
          />
        </Card>
      ))}
    </div>
  );
}

export default FollowingCard;
