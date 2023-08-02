import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

interface Joiner {
  profileImg: string;
  nickname: string;
  joinDate: string;
}

const TourReserveButton = ({
  tourId,
  isJoined,
  setIsJoined,
  joiners,
  setJoiners,
}: {
  tourId: string | undefined;
  isJoined: boolean;
  setIsJoined: (isjoined: boolean) => void;
  joiners: Joiner[];
  setJoiners: (joiners: Joiner[]) => void;
}) => {
  const { accessToken, profileImg, nickname } = useSelector(
    (state: any) => state.userInfo
  );

  const reserveHandler = async () => {
    try {
      console.log(accessToken);
      const res = await axios.post(
        `http://52.79.93.203/tour/reservation/${tourId}`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(res.data);
      setIsJoined(true);
      setJoiners([
        ...joiners,
        {
          profileImg: profileImg,
          nickname: nickname,
          joinDate: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelHandler = async () => {
    try {
      console.log(accessToken);
      const res = await axios.delete(
        `http://52.79.93.203/tour/reservation/${tourId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(res.data);
      setIsJoined(false);
      const updatedJoiners = joiners.filter(
        (joiner) => joiner.nickname !== nickname
      );
      setJoiners(updatedJoiners);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isJoined ? (
        <button onClick={cancelHandler}>예약 취소하기</button>
      ) : (
        <button onClick={reserveHandler}>투어 예약하기</button>
      )}
    </>
  );
};

export default TourReserveButton;
