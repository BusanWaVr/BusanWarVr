import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function GuideMain() {
  const { guideInfoData } = useOutletContext();

  useEffect(() => {
    console.log("가이드 내 정보에서 받고 있음", guideInfoData);
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/update");
  };

  return (
    <div>
      {guideInfoData ? (
        <>
          {guideInfoData.introduction ? (
            <h1>{guideInfoData.introduction}</h1>
          ) : (
            <h1>등록된 한 줄 소개가 없습니다.</h1>
          )}

          <div>
            <p>이메일 : {guideInfoData.email}</p>
            <p>닉네임 : {guideInfoData.nickname}</p>
            <p>가이드 평점 : {guideInfoData.averageScore}</p>
            <p>투어 수 : {guideInfoData.tourNumbers}</p>
            <p>투어 수 : {guideInfoData.introduction}</p>

            <button onClick={handleClick}>내 정보 수정</button>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default GuideMain;
