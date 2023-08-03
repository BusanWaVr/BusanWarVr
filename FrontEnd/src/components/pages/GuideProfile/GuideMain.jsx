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
      {guideInfoData.introduction ? (
        <h1>{guideInfoData.introduction}</h1>
      ) : (
        <h1>{guideInfoData.nickname}의 마이페이지!</h1>
      )}

      {guideInfoData ? (
        <div>
          <p>이메일 : {guideInfoData.email}</p>
          <p>닉네임 : {guideInfoData.nickname}</p>
          <p>가이드 평점 : {guideInfoData.averageScore}</p>
          <p>투어 수 : {guideInfoData.tourNumbers}</p>

          <button onClick={handleClick}>내 정보 수정</button>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default GuideMain;
