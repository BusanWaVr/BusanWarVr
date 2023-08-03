import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function GuideMain() {
  const { guideInfoData } = useOutletContext();

  useEffect(() => {
    console.log("가이드 내 정보에서 받고 있음", guideInfoData);
  }, []);

  return (
    <div>
      <h1>가이드 마이페이지 메인</h1>
    </div>
  );
}

export default GuideMain;
