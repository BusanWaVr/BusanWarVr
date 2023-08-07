import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TourReserveButton from "./TourReserveButton";
import { useSelector } from "react-redux";
import TourDetailContent from "./TourDetailContent";
import TourCancelButton from "./TourCancelButton";
import TourWishButton from "./TourWishButton";

interface TourData {
  tourId: string;
  title: string;
  subTitle: string;
  userId: string;
  profileImg: string;
  nickname: string;
  category: string[];
  startDate: string;
  endDate: string;
  minMember: number;
  maxMember: number;
  content: string;
  tourImgs: string[];
  joiners: Joiner[];
  canceled: boolean;
  ended: boolean;
  courses: Course[];
}

interface Course {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: string;
}

interface Joiner {
  profileImage: string;
  nickname: string;
  joinDate: string;
}

const TourDetail: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [tourData, setTourData] = useState<TourData | null>(null);
  const { userId, nickname, userType } = useSelector(
    (state: any) => state.userInfo
  );
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [joiners, setJoiners] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/tour/${tourId}`
        );
        if (response.status === 200) {
          const res = await response.json();
          setTourData(res.data);
          setJoiners(res.data.joiners);
          const isUserJoined = res.data.joiners.some(
            (joiner: Joiner) => joiner.nickname === nickname
          );
          setIsJoined(isUserJoined);
        } else {
          alert("해당 투어가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTourData();
  }, [tourId]);

  return (
    <>
      {tourData ? (
        <div>
          <TourDetailContent tourData={tourData} joiners={joiners} />
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
        </div>
      ) : (
        <p>로딩중</p>
      )}
    </>
  );
};

export default TourDetail;
