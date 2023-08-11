import React, { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import GuideInfo from "./GuideInfo";
import GuideCalendar from "./GuideCalendar";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const UserInfoWrapper = styled.div`
  height: 300px;
  // background-color: #ffffff;
  // border-radius: 5px;
  margin: 20px 0;
`;

function GuideMain() {
  const { guideInfoData, isMe } = useOutletContext();

  const navigate = useNavigate();

  return (
    <div>
      {isMe ? (
        guideInfoData ? (
          <div>
            <UserInfoWrapper>
              <GuideInfo userInfoData={guideInfoData} />
            </UserInfoWrapper>

            <GuideCalendar />
          </div>
        ) : (
          <p>loading</p>
        )
      ) : (
        <p>다른 유저의 상세정보는 비공개입니다.</p>
      )}
    </div>
  );
}

export default GuideMain;
