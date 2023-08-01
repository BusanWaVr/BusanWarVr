import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TourReserveButton = ({
  tourId,
  isJoined,
}: {
  tourId: string | undefined;
  isJoined: boolean;
}) => {
  const { accessToken } = useSelector((state: any) => state.userInfo);

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
