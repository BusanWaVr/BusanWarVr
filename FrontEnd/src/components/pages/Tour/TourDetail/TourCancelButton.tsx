import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TourCancelButton = ({ tourId }: { tourId: string | undefined }) => {
  const { accessToken } = useSelector((state: any) => state.userInfo);

  const cancelHandler = async () => {
    try {
      console.log(accessToken);
      const res = await axios.delete(
        `http://52.79.93.203/tour/wish/${tourId}`,
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
      <button onClick={cancelHandler}>투어 취소하기</button>
    </>
  );
};

export default TourCancelButton;
