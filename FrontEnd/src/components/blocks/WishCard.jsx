import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Heart from "react-heart";
import axios from "axios";
import { Card, CardHeader, CardFooter, Image, Chip } from "@nextui-org/react";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setWishTour } from "../../store/reducers/UserInfoReducer";
import { useI18n } from "../../hooks/useI18n";

const WishCard = ({ wishData }) => {
  const t = useI18n();
  const dispatch = useDispatch();

  const { userType } = useSelector((state) => state.userInfo);

  const { accessToken, wishTour } = useSelector((state) => state.userInfo);
  const [wishlist, setWishlist] = useState(JSON.parse(wishTour));
  const isInWishlist = (tourId) => {
    return wishlist.includes(tourId);
  };

  const btnClickHandler = async (tourId) => {
    try {
      if (isInWishlist(tourId)) {
        const newWishTour = wishlist.filter((tour) => tour !== tourId);
        setWishlist(newWishTour);
        dispatch(setWishTour(JSON.stringify(newWishTour)));
      } else {
        const newWishTour = wishlist.concat(tourId);
        setWishlist(newWishTour);
        dispatch(setWishTour(JSON.stringify(newWishTour)));
      }

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
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <>
      {wishData.length > 0 && (
        <div className="max-w-[1200px] gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-8 mx-auto my-6">
          {wishData.map((wish, i) => (
            <Card
              key={i}
              isFooterBlurred
              className="w-full h-[300px] bg-sky-800"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <div className="w-full flex justify-between items-center">
                  <p className="text-xs text-gray-200">
                    {formatDate(wish.startDate)}
                  </p>
                  <div style={{ width: "1.2rem" }}>
                    {userType == "USER" && (
                      <Heart
                        activeColor="#ff6161ff"
                        inactiveColor="#ff4040ff"
                        isActive={isInWishlist(wish.tourId)}
                        onClick={() => btnClickHandler(wish.tourId)}
                      />
                    )}
                  </div>
                </div>

                <h4 className="text-black font-medium text-lg/5 text-left mb-1 text-white">
                  {wish.title}
                </h4>
                <div className="mb-2 opacity-80">
                  {wish.category.map(
                    (c, i) =>
                      i < 3 && (
                        <span
                          key={i}
                          className="p-1 px-2 mr-1 text-xs font-semibold text-blue-700 bg-sky-100 rounded-full border-1 border-blue-500"
                        >
                          #{c}
                        </span>
                      )
                  )}
                </div>
              </CardHeader>
              <Link to={`/tour/${wish.tourId}`} className="h-full">
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover data-[loaded=true]:opacity-50"
                  src={
                    wish.tourImage
                      ? wish.tourImage
                      : "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
                  }
                />
              </Link>
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 block flex justify-between">
                <Chip size="sm" color="primary" variant="solid">
                  <span className="text-xs flex items-center gap-1">
                    <TeamOutlined />
                    <div>
                      {wish.currentMember} / {wish.maxMember}
                    </div>
                  </span>
                </Chip>
                <Link
                  className="flex justify-end gap-2 items-center"
                  to={`/guide/${wish.guide.id}/mypage`}
                >
                  <span className="text-sky-100"> {wish.guide.name}</span>
                  <Avatar
                    src={wish.guide.profileImg}
                    size="small"
                    icon={<UserOutlined />}
                  />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default WishCard;
