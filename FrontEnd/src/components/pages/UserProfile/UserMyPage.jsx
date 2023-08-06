import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserMini from "./UserMini";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  width: 70%;
  // background-color: #343434;
`;

const NavbarWrapper = styled.div`
  width: 30%;
  // background-color: #505050;
`;

const OutletWrapper = styled.div`
  width: 70%;
  // background-color: #808080;
`;

function UserMyPage() {
  // 내 정보 가져오기

  const [userInfoData, setUserInfoData] = useState(null);
  const [isMe, setIsMe] = useState(false);

  const { userId } = useParams();

  useEffect(() => {

    const localUserId = localStorage.getItem('userId');

    if (userId === localUserId) {
      setIsMe(true);
    }


    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://52.79.93.203/user/userInfo/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("유저데이터 받았어요");
          const data = await response.json();
          setUserInfoData(data.data);
          console.log("부모에서 넘겨주고 있음", data.data);
        } else {
          alert("유저데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Wrapper>
      <NavbarWrapper>
        <UserMini
          userInfoData={userInfoData}
          isMe={isMe} />
        <UserNavbar />
      </NavbarWrapper>
      <OutletWrapper>
        <Outlet context={{ userInfoData, isMe }}/>
      </OutletWrapper>
    </Wrapper>
  );
}

export default UserMyPage;
