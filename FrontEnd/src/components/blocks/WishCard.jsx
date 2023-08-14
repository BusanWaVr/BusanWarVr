import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BoogieNone from "../../assets/boogie_none.png";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Chip,
} from "@nextui-org/react";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setWishTour } from "../../store/reducers/UserInfoReducer";

function WishCard({ wishData }) {
  const dispatch = useDispatch();

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
  console.log(wishData);
  return (
    <>
      {wishData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full opacity-50">
          <img className="w-1/6" src={BoogieNone} alt="no wishlist" />
          <p className="font-semibold">위시리스트가 없어요</p>
        </div>
      )}
      <div className="max-w-[1200px] gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-8 mx-auto my-6">
        {wishData.map((wish, i) => (
          <Card key={i} isFooterBlurred className="w-full h-[300px] bg-sky-800">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <div className="w-full text-right">
                <Button
                  onClick={() => btnClickHandler(wish.tourId)}
                  size="small"
                  variant="outlined"
                  color={isInWishlist(wish.tourId) ? "secondary" : "primary"}
                >
                  {isInWishlist(wish.tourId) ? "찜 취소" : "찜하기"}
                </Button>
              </div>
              <h4 className="text-black font-medium text-lg/5 text-left ml-1 my-2 text-white">
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
                <span className="text-slate-600"> {wish.guide.name}</span>
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
    </>
  );
}

export default WishCard;
