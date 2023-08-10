import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserCalendar from "./UserCalendar";

function UserMain() {
  const { userInfoData, isMe } = useOutletContext();

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
      {isMe ? (
        userInfoData ? (
          <div>
            <p>이메일: {userInfoData.email}</p>
            <p>닉네임: {userInfoData.nickname}</p>

            <UserCalendar />

            <button onClick={handleClick}>내 정보 수정</button>
          </div>
        ) : (
          <p>로딩중ㅎ</p>
        )
      ) : (
        <p>다른 유저의 상세정보는 비공개입니다.</p>
      )}
    </div>
  );
}

export default UserMain;
