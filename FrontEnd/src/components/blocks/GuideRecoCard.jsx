import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
display: flex;
  flex-direction: row;   // 가로 배열
  align-items: center;   // 가로 중앙 정렬
  justify-content: center;
  margin: 20px;
//   overflow-x: scroll;
`;

const Card = styled.div`
  margin: 20px;
  background-color: white;
  width: 200px;
  height: 350px;
  border-radius: 20px;
`;

function GuideRecoCard({ guideRecoData }) {
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
                    width: "100%",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <p>등록된 프로필 이미지가 없습니다.</p>
              )}
              <Link to={`/guide/${guide.tourId}/mypage`}>
                <h2>{guide.nickname}</h2>
              </Link>
              <p>팔로워 : {guide.followerNum}</p>
              <p>투어 수 : {guide.tourNumbers}</p>
              <p>평점 : {guide.averageScore}</p>
            </Card>
          ))
        ) : (
          <p>추천 가이드 데이터가 없습니다</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </CardContainer>
  );
}

export default GuideRecoCard;
