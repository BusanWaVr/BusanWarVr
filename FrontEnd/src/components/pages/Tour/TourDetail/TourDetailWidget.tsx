import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import TourReserveButton from "./TourReserveButton";
import TourCancelButton from "./TourCancelButton";
import TourWishButton from "./TourWishButton";
import { Button } from "antd";
import { useI18n } from "../../../../hooks/useI18n";

const TourDetailWidgetWrapper = styled.div`
  width: 320px;
  padding-top: 40px;
`;
const StickeyWidget = styled.div`
  position: sticky;
  padding: 20px;
  box-sizing: border-box;
  top: 80px;
  box-shadow: 0px 0px 5px #d5d5da;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;

  & .tour-date__title {
    font-size: 14px;
    color: #1983ff;
    font-weight: 700;
  }

  & .tour-date__date {
    font-size: 14px;
  }

  & .tour-date__time {
    font-size: 18px;
    font-weight: 700;
  }
`;
const TourGuideInfo = styled.div`
  & img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
  & > a {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

const TourButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const TourDetailWidget = ({
  tourData,
  isJoined,
  setIsJoined,
  joiners,
  setJoiners,
}: {
  tourData: any;
  isJoined: any;
  setIsJoined: any;
  joiners: any;
  setJoiners: any;
}) => {
  const { tourId } = useParams<{ tourId: string }>();
  const { userId, userType } = useSelector((state: any) => state.userInfo);

  const day = ["일", "월", "화", "수", "목", "금", "토", "일"];

  const formatDate = (date: Date) => {
    const newDate =
      date.getFullYear() +
      "년 " +
      (date.getMonth() + 1) +
      "월 " +
      date.getDate() +
      "일 " +
      day[date.getDay()] +
      "요일";
    return newDate;
  };

  const formatTime = (time: Date) => {
    const newTime =
      String(time.getHours()).padStart(2, "0") +
      ":" +
      String(time.getMinutes()).padStart(2, "0");

    return newTime;
  };

  const t = useI18n();

  const tourDate = formatDate(new Date(tourData.startDate));
  const startTime = formatTime(new Date(tourData.startDate));
  const endTime = formatTime(new Date(tourData.endDate));

  return (
    <>
      <TourDetailWidgetWrapper>
        <StickeyWidget>
          <div className="tour-date">
            <p className="tour-date__title">{t(`투어시간`)}</p>
            <p className="tour-date__date">{tourDate}</p>
            <p className="tour-date__time">
              {startTime} ~ {endTime}
            </p>
          </div>
          <TourButtonContainer>
            {userId && userType == "USER" ? (
              <TourWishButton tourId={tourId} />
            ) : null}
            {userId == tourData.userId ? (
              <>
                {tourData.canceled ? (
                  <Button
                    disabled
                    block
                    style={{ width: "100%", height: "40px" }}
                  >
                    {t(`취소된 투어입니다.`)}
                  </Button>
                ) : (
                  <>
                    <Link to={`/tour/${tourId}/update`}>
                      <Button block style={{ width: "100%", height: "40px" }}>
                        {t(`수정하기`)}
                      </Button>
                    </Link>
                    <TourCancelButton tourId={tourId} />
                  </>
                )}
              </>
            ) : (
              <>
                {userType == "USER" &&
                userId &&
                !tourData.canceled &&
                !tourData.ended &&
                new Date(tourData.startDate) > new Date() ? (
                  <TourReserveButton
                    tourId={tourId}
                    maxMember={tourData.maxMember}
                    isJoined={isJoined}
                    setIsJoined={setIsJoined}
                    joiners={joiners}
                    setJoiners={setJoiners}
                  />
                ) : null}
                {tourData.ended ||
                (new Date(tourData.startDate) < new Date() &&
                  !tourData.canceled) ? (
                  <Button
                    disabled
                    block
                    style={{ width: "100%", height: "40px" }}
                  >
                    {t(`종료된 투어입니다.`)}
                  </Button>
                ) : null}
                {tourData.canceled ? (
                  <Button
                    disabled
                    block
                    style={{ width: "100%", height: "40px" }}
                  >
                    {t(`취소된 투어입니다.`)}
                  </Button>
                ) : null}
              </>
            )}
          </TourButtonContainer>
          <hr />
          <TourGuideInfo>
            <Link to={`/guide/${tourData.userId}/mypage`}>
              <img src={tourData.profileImg} alt="" />
              {tourData.nickname}
            </Link>
          </TourGuideInfo>
        </StickeyWidget>
      </TourDetailWidgetWrapper>
    </>
  );
};

export default TourDetailWidget;
