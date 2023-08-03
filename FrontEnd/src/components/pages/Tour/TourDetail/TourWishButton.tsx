import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setWishTour } from "../../../../store/reducers/UserInfoReducer";

const TourWishButton: React.FC<{
  tour: any;
  tourId: string;
}> = ({ tourId }) => {
  const dispatch = useDispatch();

  const { accessToken, wishTour } = useSelector((state: any) => state.userInfo);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(
    JSON.parse(wishTour).some((tour: string) => tour == tourId)
  );

  useEffect(() => {
    console.log("초기 세팅");
    console.log(JSON.parse(wishTour).some((tour: string) => tour == tourId));
    setIsInWishlist(
      JSON.parse(wishTour).some((tour: string) => tour == tourId)
    );
  }, [wishTour]);

  const btnClickHandler = () => {
    const add = async () => {
      try {
        const res = await axios.post(
          `http://52.79.93.203/tour/wish/${tourId}`,
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
      <button onClick={btnClickHandler}>
        {isInWishlist ? <>찜 취소</> : <>찜하기</>}
      </button>
    </>
  );
};

export default TourWishButton;
