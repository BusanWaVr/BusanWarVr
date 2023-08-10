import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserInfo from "./UserInfo";
import UserCalendar from "./UserCalendar";
import { styled } from "styled-components";

const UserInfoWrapper = styled.div`
  height: 300px;
  // background-color: #ffffff;
  // border-radius: 5px;
  margin: 20px 0;
`;

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
            <UserInfoWrapper>
              <UserInfo userInfoData={userInfoData} />

            </UserInfoWrapper>

            <UserCalendar />
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
