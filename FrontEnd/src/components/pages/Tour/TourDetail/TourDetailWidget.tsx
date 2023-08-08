import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import TourReserveButton from "./TourReserveButton";
import TourCancelButton from "./TourCancelButton";
import TourWishButton from "./TourWishButton";

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

  const TourDetailWidgetWrapper = styled.div`
    width: 320px;
  `;
  const StickeyWidget = styled.div`
    position: sticky;
    top: 80px;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: #fff;
  `;
  const TourGuideInfo = styled.div`
    & img {
      width: 45px;
      height: 45px;
      border-radius: 45px;
    }
  `;

  const day = ["일", "월", "화", "수", "목", "금", "토", "일"];

  const formatDate = (date: Date) => {
    const newDate =
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getDate() +
      " " +
      day[date.getDay()] +
      "요일";
    return newDate;
  };

  const formatTime = (time: Date) => {
    const newTime = time.getHours() + ":" + time.getMinutes();

    return newTime;
  };

  const tourDate = formatDate(new Date(tourData.startDate));
  const startTime = formatTime(new Date(tourData.startDate));
  const endTime = formatTime(new Date(tourData.endDate));

  return (
    <>
      <TourDetailWidgetWrapper>
        <StickeyWidget>
          <p>{tourDate}</p>
          <p>
            {startTime} ~ {endTime}
          </p>
          <TourGuideInfo>
            <Link to={`/guide/${tourData.userId}/mypage`}>
              <img src={tourData.profileImg} alt="" />
              {tourData.nickname}
            </Link>
          </TourGuideInfo>
          {userId && userType == "USER" ? (
            <TourWishButton tourId={tourId} />
          ) : null}
          <hr />
          {userId == tourData.userId ? (
            <>
              {tourData.canceled ? (
                <button disabled>취소된 투어입니다.</button>
              ) : (
                <>
                  <Link to={`/tour/${tourId}/update`}>
                    <button>수정하기</button>
                  </Link>
                  <TourCancelButton tourId={tourId} />
                </>
              )}
            </>
          ) : (
            <>
              {userId &&
              !tourData.canceled &&
              !tourData.ended &&
              new Date(tourData.startDate) > new Date() ? (
                <TourReserveButton
                  tourId={tourId}
                  isJoined={isJoined}
                  setIsJoined={setIsJoined}
                  joiners={joiners}
                  setJoiners={setJoiners}
                />
              ) : null}
              {tourData.ended ||
              (new Date(tourData.startDate) < new Date() &&
                !tourData.canceled) ? (
                <button disabled>종료된 투어입니다.</button>
              ) : null}
              {tourData.canceled ? (
                <button disabled>취소된 투어입니다.</button>
              ) : null}
            </>
          )}
        </StickeyWidget>
      </TourDetailWidgetWrapper>
    </>
  );
};

export default TourDetailWidget;
