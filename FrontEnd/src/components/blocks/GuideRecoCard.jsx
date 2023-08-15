import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n"

const CardContainer = styled.div`
  display: flex;
  flex-direction: row; // 가로 배열
  align-items: center; // 가로 중앙 정렬
  justify-content: center;
  margin: 20px;
  //   overflow-x: scroll;
`;

const Card = styled.div`
  margin: 20px;
  width: 200px;
  height: 250px;
  border-radius: 20px;
`;

function GuideRecoCard({ guideRecoData }) {
  const t = useI18n()
  return (
    <CardContainer>
      {guideRecoData ? (
        guideRecoData.length > 0 ? (
          guideRecoData.map((guide) => (
            <Card key={guide.userId}>
              {guide.profileImg ? (
                <img
                  src={guide.profileImg}
                  alt="프로필 이미지"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <p>{t(`등록된 프로필 이미지가 없습니다.`)}</p>
              )}
              <Link to={`/guide/${guide.tourId}/mypage`}>
                <h5>{guide.nickname}</h5>
              </Link>
              <p>{t(`팔로워`)} : {guide.followerNum}</p>
              <p>{t(`투어 수`)} : {guide.tourNumbers}</p>
              <p>{t(`평점`)} : {guide.averageScore}</p>
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
