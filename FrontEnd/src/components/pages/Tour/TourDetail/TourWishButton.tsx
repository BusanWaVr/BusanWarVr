import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishTour } from "../../../../store/reducers/UserInfoReducer";
import { Button } from "antd";
import axios from "axios";
import { useI18n } from "../../../../hooks/useI18n"

const TourWishButton: React.FC<{
  tourId: string | undefined;
}> = ({ tourId }) => {
  const dispatch = useDispatch();

  const { accessToken, wishTour } = useSelector((state: any) => state.userInfo);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(
    JSON.parse(wishTour).some((tour: string) => tour == tourId)
  );

  useEffect(() => {
    console.log(JSON.parse(wishTour).some((tour: string) => tour == tourId));
    setIsInWishlist(
      JSON.parse(wishTour).some((tour: string) => tour == tourId)
    );
  }, [wishTour]);

  const t = useI18n()

  const btnClickHandler = () => {
    const add = async () => {
      try {
        const res = await axios.post(
          `https://busanwavrserver.store/tour/wish/${tourId}`,
          {},
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    };
    add();
    if (isInWishlist) {
      const newWishTour = JSON.parse(wishTour).filter(
        (tour: string) => tour != tourId
      );
      console.log("찜취소", newWishTour);
      dispatch(setWishTour(JSON.stringify(newWishTour)));
    } else {
      const newWishTour = JSON.parse(wishTour).concat(parseInt(tourId));
      dispatch(setWishTour(JSON.stringify(newWishTour)));
      console.log("찜하기", newWishTour);
    }
  };

  return (
    <>
      <Button
        onClick={btnClickHandler}
        style={{ width: "100%", height: "40px" }}
      >
        {isInWishlist ? <>{t(`찜 취소`)}</> : <>{t(`찜하기`)}</>}
      </Button>
    </>
  );
};

export default TourWishButton;
