import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useI18n } from "../../../../hooks/useI18n";
import { toast } from "react-toastify";

interface Joiner {
  profileImage: string;
  nickname: string;
  joinDate: string;
}

const TourReserveButton = ({
  tourId,
  maxMember,
  isJoined,
  setIsJoined,
  joiners,
  setJoiners,
}: {
  tourId: string | undefined;
  maxMember: number | undefined;
  isJoined: boolean;
  setIsJoined: (isjoined: boolean) => void;
  joiners: Joiner[];
  setJoiners: (joiners: Joiner[]) => void;
}) => {
  const { accessToken, profileImage, nickname } = useSelector(
    (state: any) => state.userInfo
  );

  const reserveHandler = async () => {
    if (maxMember == joiners.length) {
      toast.error("정원이 마감된 투어입니다.");
      return;
    }
    try {
      const res = await axios.post(
        `https://busanwavrserver.store/tour/reservation/${tourId}`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      if (res.data.code == 200) {
        toast.success(res.data.message);
        setIsJoined(true);
        setJoiners([
          ...joiners,
          {
            profileImage: profileImage,
            nickname: nickname,
            joinDate: new Date().toISOString(),
          },
        ]);
      } else {
        toast.error("잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelHandler = async () => {
    try {
      const res = await axios.delete(
        `https://busanwavrserver.store/tour/reservation/${tourId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      if (res.data.code == 200) {
        toast.success(res.data.message);
        setIsJoined(false);
        const updatedJoiners = joiners.filter(
          (joiner) => joiner.nickname !== nickname
        );
        setJoiners(updatedJoiners);
      } else {
        toast.error("잠시 후 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const t = useI18n();

  return (
    <>
      {isJoined ? (
        <Button
          onClick={cancelHandler}
          style={{ width: "100%", height: "40px" }}
          danger
        >
          {t(`예약 취소하기`)}
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={reserveHandler}
          style={{ width: "100%", height: "40px" }}
        >
          {t(`투어 예약하기`)}
        </Button>
      )}
    </>
  );
};

export default TourReserveButton;
