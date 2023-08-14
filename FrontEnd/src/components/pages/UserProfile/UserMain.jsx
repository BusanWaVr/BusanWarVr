import React from "react";
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

  const navigate = useNavigate();

  return (
    <div>
      {userInfoData ? (
        <div>
          <UserInfoWrapper>
            <UserInfo userInfoData={userInfoData} isMe={isMe} />
          </UserInfoWrapper>
          <UserCalendar />
        </div>
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
}

export default UserMain;
