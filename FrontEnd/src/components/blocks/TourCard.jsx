import TourJoinBtn from "./TourJoinBtn.jsx";
import "moment/locale/ko";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import moment from "moment";

function TourCard({ TourData, isMe, tourType }) {
  const navigate = useNavigate();

  const [showMateButton, setShowMateButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    setShowEditButton(tourType === "ended");
    setShowMateButton(tourType === "scheduled");
  }, [tourType]);

  moment.locale("ko");

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
                        <div className="my-2">
                          <Avatar size="small" icon={<UserOutlined />} />
                          <Link to={`/guide/${tour.guide.id}/mypage`}>
                            <span> {tour.guide.name}</span>
                          </Link>
                        </div>
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
                <div className="flex flex-col justify-center mt-4">
                  {isMe &&
                    showMateButton &&
                    (tour.link ? (
                      <TourJoinBtn Tour={tour} />
                    ) : (
                      <Link to={`/mate/${tour.tourId}/write`}>
                        <Button
                          className="mt-3 bg-blue-50 p-3 rounded-md w-full"
                          color="primary"
                          variant="flat"
                        >
                          <UsergroupAddOutlined />
                          메이트 모집
                        </Button>
                      </Link>
                    ))}
                  {isMe && showEditButton && (
                    <Link
                      to={`/review/${tour.tourId}/write`}
                      className="w-full"
                    >
                      <Button
                        className="mt-3 bg-blue-50 p-3 rounded-md w-full"
                        color="primary"
                        variant="flat"
                      >
                        리뷰 쓰기
                      </Button>
                    </Link>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>투어 데이터가 없습니다</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TourCard;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import TourJoinBtn from "./TourJoinBtn.jsx";

// const CardContainer = styled.div`
//   margin: 50px;
// `;

// function TourCard({ TourData, isMe, tourType }) {
//   const [showMateButton, setShowMateButton] = useState(false);
//   const [showEditButton, setShowEditButton] = useState(false);

//   useEffect(() => {
//     setShowEditButton(tourType === "ended");
//     setShowMateButton(tourType === "tour");
//   }, [tourType]);

//   return (
//     <div>
//       {TourData ? (
//         TourData.length > 0 ? (
//           TourData.map((tour) => (
//             <CardContainer key={tour.tourId}>
//               <Link to={`/tour/${tour.tourId}`}>
//                 <h2>{tour.title}</h2>
//               </Link>
//               <span>가이드 :</span>
//               <Link to={`/guide/${tour.guide.id}/mypage`}>
//                 <span> {tour.guide.name}</span>
//               </Link>
//               <p>시작 날짜 : {tour.startDate}</p>
//               {/* 카테고리가 없네.. */}
//               {/* <p>카테고리 : #{tour.category.join(" #")}</p> */}
//               <p>
//                 <strong>
//                   {tour.currentMember}/{tour.maxMember}
//                 </strong>
//               </p>
//               {isMe && showEditButton && (
//                 <Link to={`/review/${tour.tourId}/write`}>
//                   <button>리뷰 쓰기</button>
//                 </Link>
//               )}
//               {isMe && showMateButton && (
//                 <div>
//                   <Link to={`/mate/${tour.tourId}/write`}>
//                     <button>메이트 모집</button>
//                   </Link>
//                   <TourJoinBtn Tour={tour} />
//                 </div>
//               )}
//             </CardContainer>
//           ))
//         ) : (
//           <p>투어 데이터가 없습니다</p>
//         )
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default TourCard;
