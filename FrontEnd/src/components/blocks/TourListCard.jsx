import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n";
import { Chip } from "@nextui-org/react";
import { Avatar } from "antd";
import moment from "moment";
import {
  EnvironmentFilled,
  CalendarOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

function TourListCard({ TourData }) {
  const t = useI18n();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [categorySize, setCategorySize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(windowSize);
    if (windowSize.width < 768) {
      setCategorySize(3);
    } else if (windowSize.width < 640) {
      setCategorySize(1);
    } else {
      setCategorySize(5);
    }
  }, [windowSize]);

  return (
    <div className="flex flex-col gap-8 drop-shadow-md">
      {TourData ? (
        TourData.length > 0 ? (
          TourData.map((tour, index) => (
            <div
              key={tour.id}
              className="relative flex items-center w-5/6 lg:w-3/5 mx-auto h-48 rounded-lg overflow-hidden"
              style={{ backgroundColor: "rgba(246, 247, 255, 1)" }}
            >
              <div className="h-full w-1/6 md:w-1/4">
                <img
                  src={
                    tour.images[0] ||
                    "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
                  }
                  alt="투어 이미지"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="text-left w-full h-full flex flex-col justify-between p-5">
                <div>
                  <div className="mb-2 opacity-80 flex">
                    <div className="hidden md:flex w-fit items-center gap-1 p-1 px-2 mr-1 text-xs font-semibold text-white bg-blue-700 rounded-full border-1 border-blue-700">
                      <EnvironmentFilled />
                      {tour.region}
                    </div>
                    {tour.categorys.map(
                      (c, i) =>
                        i < categorySize && (
                          <span
                            key={i}
                            className="p-1 px-2 mr-1 text-xs font-semibold text-blue-700 bg-sky-100 rounded-full border-1 border-blue-500"
                          >
                            #{c}
                          </span>
                        )
                    )}
                  </div>
                  <Link
                    to={`/tour/${tour.id}`}
                    className="text-md md:text-lg font-semibold text-blue-500"
                  >
                    <h2>{tour.title}</h2>
                  </Link>

                  <span className="text-xs md:text-sm text-gray-500">
                    {tour.subTitle}
                  </span>

                  <p className="flex items-center gap-1 text-xs md:text-sm font-semibold">
                    <CalendarOutlined />
                    {moment(tour.startDate)
                      .utcOffset(9)
                      .format("YYYY/MM/DD HH:mm")}{" "}
                    ~
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Chip size="sm" color="primary" variant="solid">
                    <span className="text-xs flex items-center gap-1">
                      <TeamOutlined />
                      <div className="hidden md:block">현재 모집 인원</div>
                      <div>
                        {tour.currentMember} / {tour.maxMember}
                      </div>
                    </span>
                  </Chip>
                  <Link
                    className="flex justify-end gap-2 items-center"
                    to={`/guide/${tour.guide.userId}/mypage`}
                  >
                    <span className="text-blue-900 text-xs md:text-base">
                      {tour.guide.nickname}
                    </span>
                    <Avatar
                      src={tour.guide.profileImg}
                      size="small"
                      icon={<UserOutlined />}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>{t(`투어 데이터가 없습니다`)}</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TourListCard;
