import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function UserMain() {
  const { userInfoData } = useOutletContext();

  useEffect(() => {
    console.log("자식이 받고 있음", userInfoData);
  }, []);

  const navigate = useNavigate();
  // TODO : 로컬에 저장되어있는 userId랑 다르면 이 페이지 렌더링 안되게

  const handleClick = () => {
    navigate("/update");
  };

  return (
    <div>
      <h1>유저 마이페이지 메인</h1>
      {userInfoData ? (
        <div>
          <p>이메일 : 추후 수정</p>
          <p>닉네임 : {userInfoData.nickname}</p>

          <button onClick={handleClick}>내 정보 수정</button>
        </div>
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
}

export default UserMain;
