import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import AssistantPhotoRoundedIcon from "@mui/icons-material/AssistantPhotoRounded";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row; // 가로 배열
  align-items: center; // 가로 중앙 정렬
  justify-content: center;
  position: relative;
  z-index: 5;
`;

const Card = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 5px;
  min-width: 200px;
  height: 300px;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

function GuideRecoCard({ guideRecoData }) {
  console.log(guideRecoData);
  const t = useI18n();
  return (
    <CardContainer>
      {guideRecoData ? (
        guideRecoData.length > 0 ? (
          guideRecoData.map((guide) => (
            <Card key={guide.userId} className="flex flex-col items-center">
              <img
                className="rounded-full"
                src={
                  guide.profileImg
                    ? guide.profileImg
                    : "https://busanwavr.s3.ap-northeast-2.amazonaws.com/%EB%B6%80%EA%B8%B0.png"
                }
                alt="프로필 이미지"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
              <div
                style={{
                  width: "120px",
                }}
              >
                <Link
                  to={`/guide/${guide.userId}/mypage`}
                  className="font-bold block my-2"
                >
                  <div
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {guide.nickname}
                  </div>
                </Link>
              </div>
              <div className="">
                <div className="flex justify-between mb-2">
                  <StarOutlineRoundedIcon
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <p>
                    <strong>{t(`평점`)}</strong> {guide.averageScore}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <PeopleOutlineRoundedIcon
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <p>
                    <strong>{t(`팔로워`)}</strong> {guide.followerNum}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <AssistantPhotoRoundedIcon
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <p>
                    <strong>{t(`투어 수`)}</strong> {guide.tourNumbers}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>{t(`추천 가이드 데이터가 없습니다`)}</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </CardContainer>
  );
}

export default GuideRecoCard;
