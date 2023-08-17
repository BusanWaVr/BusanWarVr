import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Avatar, Card } from "antd";
import BoogieNone from "../../assets/boogie_none.png";
import { useI18n } from "../../hooks/useI18n";
import { toast } from "react-toastify";

const { Meta } = Card;

function FollowingCard({ followingData, isMe }) {
  const t = useI18n();
  const [followedGuides, setFollowedGuides] = useState([]);

  useEffect(() => {
    const initialFollowedGuides = followingData.map(
      (Following) => Following.id
    );
    setFollowedGuides(initialFollowedGuides);
  }, [followingData]);

  const changeFollow = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/");
        return;
      }

      const response = await fetch(`https://busanwavrserver.store/user/${id}`, {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (
        response.status === 200 &&
        data.message === "성공적으로 가이드를 팔로우했습니다."
      ) {
        setFollowedGuides([...followedGuides, id]);
        console.log("가이드를 팔로우했습니다.");
      } else if (
        response.status === 200 &&
        data.message === "성공적으로 가이드를 언팔로우했습니다."
      ) {
        setFollowedGuides(followedGuides.filter((guideId) => guideId !== id));
        console.log("가이드를 언팔로우했습니다.");
      } else {
        console.log("팔로우 요청 실패");
      }
    } catch (error) {
      console.error("팔로우 오류", error);
    }
  };

  return (
    <div className="h-full">
      {followingData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full opacity-50">
          <img src={BoogieNone} alt="no_following" className="w-1/6" />
          <p className="font-bold">{t(`팔로잉 중인 가이드가 없어요 :(`)}</p>
        </div>
      ) : (
        <div className="my-4">
          <p>
            총 <strong>{followingData.length}</strong>명의 가이드를 팔로우하고
            있어요.
          </p>
        </div>
      )}
      <div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {followingData.map((Following) => (
            <Card
              key={Following.id}
              style={{ margin: "10px" }}
              actions={
                isMe && [
                  <Button
                    danger={followedGuides.includes(Following.id)}
                    onClick={() => changeFollow(Following.id)}
                  >
                    {followedGuides.includes(Following.id)
                      ? "언팔로우"
                      : "팔로우"}
                  </Button>,
                ]
              }
            >
              <Link to={`/guide/${Following.id}/mypage/`}>
                <Meta
                  avatar={<Avatar src={Following.imageUrl} size="large" />}
                  title={Following.nickname}
                  description={`팔로워 ${Following.follower}ㅤ|ㅤ총 투어 ${Following.tourNumbers}`}
                />{" "}
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowingCard;
