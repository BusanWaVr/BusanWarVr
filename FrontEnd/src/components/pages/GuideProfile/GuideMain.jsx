import { useOutletContext } from "react-router-dom";
import GuideInfo from "./GuideInfo";
import GuideCalendar from "./GuideCalendar";
import { styled } from "styled-components";

const UserInfoWrapper = styled.div`
  height: 300px;
  // background-color: #ffffff;
  // border-radius: 5px;
  margin: 20px 0;
`;

function GuideMain() {
  const { guideInfoData, isMe } = useOutletContext();

  return (
    <div>
      {guideInfoData ? (
        <div>
          <UserInfoWrapper>
            <GuideInfo userInfoData={guideInfoData} isMe={isMe} />
          </UserInfoWrapper>

          <GuideCalendar />
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default GuideMain;
