import React from "react";
import BoogieNone from "../../assets/boogie_none.png";
import { Divider } from "antd";
import WishCard from "../blocks/WishCard.jsx";
import { useI18n } from "../../hooks/useI18n"

function WishCardList({ wishData }) {
  const t = useI18n()
  const sortedWishData = [...wishData].sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  const currentDate = new Date();

  const pastWishData = sortedWishData.filter((wish) => {
    return new Date(wish.startDate) < currentDate;
  });

  const upcomingWishData = sortedWishData.filter((wish) => {
    return new Date(wish.startDate) >= currentDate;
  });

  return (
    <>
      {sortedWishData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full opacity-50">
          <img className="w-1/6" src={BoogieNone} alt="no wishlist" />
          <p className="font-semibold">{t(`위시리스트가 없어요`)}</p>
        </div>
      )}
      <WishCard wishData={upcomingWishData} />
      <Divider />
      <h2 className="text-xl font-semibold mb-2">{t(`지난 투어`)}</h2>
      <WishCard wishData={pastWishData} />
    </>
  );
}

export default WishCardList;
