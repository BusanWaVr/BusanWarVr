import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "antd";

interface Joiner {
  profileImage: string;
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
  const { accessToken, profileImage, nickname } = useSelector(
    (state: any) => state.userInfo
  );

  const reserveHandler = async () => {
    try {
      console.log(accessToken);
      const res = await axios.post(
        `https://busanwavrserver.store/tour/reservation/${tourId}`,
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
          profileImage: profileImage,
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
        `https://busanwavrserver.store/tour/reservation/${tourId}`,
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
        <Button
          onClick={cancelHandler}
          style={{ width: "100%", height: "40px" }}
          danger
        >
          예약 취소하기
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={reserveHandler}
          style={{ width: "100%", height: "40px" }}
        >
          투어 예약하기
        </Button>
      )}
    </>
  );
};

export default TourReserveButton;
