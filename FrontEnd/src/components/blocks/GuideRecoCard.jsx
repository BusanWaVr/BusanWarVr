import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row; // 가로 배열
  align-items: center; // 가로 중앙 정렬
  justify-content: center;
  position: relative;
  z-index: 5;
`;

const Card = styled.div`
  min-width: 200px;
  border-radius: 20px;
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
              <div>
                <Link
                  to={`/guide/${guide.userId}/mypage`}
                  className=" font-bold block my-2"
                >
                  <h5>{guide.nickname}</h5>
                </Link>
                <di className="">
                  <p>
                    <strong>{t(`평점`)}</strong> {guide.averageScore}
                  </p>
                  <div className="text-sm flex gap-2">
                    <p>
                      <strong>{t(`팔로워`)}</strong> {guide.followerNum}
                    </p>
                    <p>
                      <strong>{t(`투어 수`)}</strong> {guide.tourNumbers}
                    </p>
                  </div>
                </di>
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
