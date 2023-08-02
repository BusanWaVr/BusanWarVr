import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../../store/reducers/wishlistReducer";

type wishTour = {
  category: string[];
  currentMember: Number;
  guide: { id: Number; name: string };
  maxMember: Number;
  startDate: string;
  title: string;
  tourId: string;
};

const TourWishButton: React.FC<{
  tour: any;
  tourId: string;
}> = ({ tour, tourId }) => {
  const currentTour = {
    tourId: tourId,
    category: tour.category,
    currentMember: tour.currentMember,
    guide: {
      id: tour.userId,
      name: tour.nickname,
    },
    maxMember: tour.maxMember,
    startDate: tour.startDate,
    title: tour.title,
  };

  const dispatch = useDispatch();
  const wishList = useSelector((state: any) => state.wishlist);
  const { accessToken } = useSelector((state: any) => state.userInfo);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    setIsInWishlist(
      wishList.some(
        (tour: wishTour) => JSON.stringify(tour) === JSON.stringify(currentTour)
      )
    );
  }, [wishList]);

  const btnClickHandler = () => {
    console.log(tour);

    if (isInWishlist) {
      dispatch(removeFromWishlist(currentTour));
    } else {
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

      dispatch(addToWishlist(currentTour));
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
