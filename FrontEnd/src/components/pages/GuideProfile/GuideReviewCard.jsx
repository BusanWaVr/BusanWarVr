import { buttonBaseClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../../hooks/useI18n";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { StarFilled } from "@ant-design/icons";
import "moment/locale/ko";
import moment from "moment";

const CardContainer = styled.div`
  margin: 50px;
`;

function GuideReviewCard({ ReviewData }) {
  const t = useI18n();
  const [reviews, setReviews] = useState(null);

  // localUserId는 srting이고, ReviewData의 userId는 number라서 바꿔줌
  const localUserId = 1 * localStorage.getItem("userId");

  useEffect(() => {
    setReviews(ReviewData);
  }, []);

  moment.locale("ko");

  console.log(ReviewData);

  return (
    <div className="max-w-[400px] md:max-w-[610px] py-12">
      {ReviewData ? (
        ReviewData.length > 0 ? (
          ReviewData.map((review) => (
            <Card
              key={review.id}
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mb-4"
              shadow="sm"
            >
              <CardBody>
                <div className="flex flex-col gap-6 md:gap-4 items-center justify-between w-full">
                  <div className="flex flex-col justify-between w-full">
                    <div className="text-xs md:text-sm w-full text-right text-zinc-400">
                      {moment(review.date)
                        .utcOffset(9)
                        .format("YYYY/MM/DD HH:mm")}
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h1 className="text-base font-semibold mt-1 ">
                          <Link to={`/tour/${review.tourId}`}>
                            {review.tourTitle}
                          </Link>
                        </h1>
                        <div className="my-1">
                          <p className="font-semibold">
                            "{review.title}"
                            <div className="flex items-center gap-1 text-blue-600 text-base">
                              <StarFilled />
                              {review.score}
                            </div>
                          </p>
                          <p>
                            {review.content
                              .replace(/(<([^>]+)>)/gi, "")
                              .replace("&gt;", "")
                              .replace("&lt;", "")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full items-center justify-center"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <></>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
    // <div>
    //   {ReviewData ? (
    //     ReviewData.length > 0 ? (
    //       ReviewData.map((review) => (
    //         <CardContainer key={review.content}>
    //           <Link to={`/tour/${review.tourId}`}>
    //             <p>{review.tourTitle}</p>
    //           </Link>
    //           <h3>
    //             {t(`별점`)} : {review.score}
    //           </h3>
    //           <div dangerouslySetInnerHTML={{ __html: review.content }} />
    //           <p>
    //             {" "}
    //             {t(`작성 날짜`)} : {review.date}
    //           </p>
    //           <Link to={`/user/${review.user.id}/mypage`}>
    //             <p>{review.user.name}</p>
    //           </Link>
    //         </CardContainer>
    //       ))
    //     ) : (
    //       <p>{t(`작성된 리뷰가 없습니다.`)}</p>
    //     )
    //   ) : (
    //     <p>{t(`로딩중ㅎ`)}</p>
    //   )}
    // </div>
  );
}

export default GuideReviewCard;
