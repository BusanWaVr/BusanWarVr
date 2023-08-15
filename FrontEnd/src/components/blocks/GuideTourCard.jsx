import TourStartBtn from "./TourStartBtn.jsx";
import "moment/locale/ko";

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CalendarOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import moment from "moment";
import { useInterval } from "react-use";
import { useI18n } from "../../hooks/useI18n"

function GuideTourCard({ TourData, tourType }) {
  const t = useI18n()
  const { userId } = useSelector((state) => state.userInfo);
  const { urlId } = useParams();

  const [seconds, setSeconds] = useState(Date.now());

  useInterval(() => {
    setSeconds(Date.now());
  }, 1000);

  moment.locale("ko");

  function formatMilliseconds(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days > 0 ? `${days}일 ` : ""}${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const sortedTourData = TourData.slice().sort((a, b) => {
    const startDateA = new Date(a.startDate);
    const startDateB = new Date(b.startDate);
    return startDateA - startDateB;
  });

  return (
    <div>
      {TourData ? (
        TourData.length > 0 ? (
          sortedTourData.map((tour) => (
            <Card
              key={tour.tourId}
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mb-4"
              shadow="sm"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Album cover"
                      className=""
                      shadow="sm"
                      src={
                        tour.image ||
                        "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
                      }
                      style={{
                        width: "400px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        {tourType == "scheduled" && (
                          <div className="flex items-center gap-1 text-small text-foreground/80">
                            <TeamOutlined />{" "}
                            <p className="text-sm">
                              <b className="text-base">{tour.currentMember}</b>{" "}
                              / {tour.maxMember}
                            </p>
                          </div>
                        )}
                        <Link to={`/tour/${tour.tourId}/`}>
                          <h1 className="text-base md:text-large font-semibold mt-1 ">
                            {tour.title}
                          </h1>
                        </Link>
                      </div>
                    </div>

                    <div className="flex mt-1 gap-2 items-center">
                      <CalendarOutlined />
                      <p className="text-xs md:text-sm">
                        {moment(tour.startDate)
                          .utcOffset(9)
                          .format("YYYY/MM/DD HH:mm")}
                      </p>
                    </div>

                    <div className="flex w-full items-center justify-center"></div>
                  </div>
                </div>
                {userId === urlId && tourType == "scheduled" && (
                  <div className="flex justify-center mt-4">
                    {new Date(tour.startDate) -
                      new Date(seconds) -
                      30 * 1000 * 60 >
                    0 ? (
                      <Button
                        className="mt-3 bg-blue-50 p-3 rounded-md w-full"
                        color="primary"
                        variant="flat"
                        isLoading
                      >
                        {t(`투어 시작 가능 시간까지`)}{" "}
                        {formatMilliseconds(
                          new Date(tour.startDate) -
                            new Date(seconds) -
                            30 * 1000 * 60
                        )}
                      </Button>
                    ) : (
                      <TourStartBtn Tour={tour} />
                    )}
                  </div>
                )}
              </CardBody>
            </Card>
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

export default GuideTourCard;
