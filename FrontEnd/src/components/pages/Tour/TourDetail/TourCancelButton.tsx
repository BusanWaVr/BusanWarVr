import { Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useI18n } from "../../../../hooks/useI18n"

const TourCancelButton = ({ tourId }: { tourId: string | undefined }) => {
  const t = useI18n()
  const { accessToken } = useSelector((state: any) => state.userInfo);

  const cancelHandler = async () => {
    try {
      console.log(accessToken);
      const res = await axios.delete(
        `https://busanwavrserver.store/tour/wish/${tourId}`,
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
      <Button
        type="primary"
        style={{ width: "100%", height: "40px" }}
        onClick={cancelHandler}
        danger
      >
        {t(`투어 취소하기`)}
      </Button>
    </>
  );
};

export default TourCancelButton;
