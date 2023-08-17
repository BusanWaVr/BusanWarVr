import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n";
import { Divider } from "antd";
import NotPresentMember from "../../assets/boogie_notPresent.jpg";
import PresentMember from "../../assets/boogie_present.jpg";
import moment from "moment";

const CardContainer = styled.div`
  border-radius: 15px;
`;

function MateCard({ mateData }) {
  const t = useI18n();
  return (
    <>
      <div className="w-4/5 gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:px-8 px-6 mx-auto my-6">
        {mateData.map((mate) => (
          <CardContainer
            key={mate.mateId}
            className="flex flex-col justify-center bg-sky-100 text-left p-6 gap-2"
            style={{}}
          >
            <div className="flex gap-4 items-center">
              <img
                src={
                  mate.tourImageUrls[0]
                    ? mate.tourImageUrls[0]
                    : "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
                }
                className="w-24 h-16 rounded-md object-cover bg-sky-200"
                alt=""
              />
              <div>
                <p>{mate.tourTitle}</p>
                <p className="text-xs text-gray-400">
                  {moment(mate.startDate)
                    .utcOffset(9)
                    .format("YYYY/MM/DD HH:mm")}
                </p>
              </div>
            </div>
            <Divider style={{ margin: "4px" }} />
            <h3>
              <Link to={`/matedetail/${mate.mateId}`}>{mate.title}</Link>
            </h3>
            <div className="flex gap-2 w-full">
              {Array.from(
                {
                  length: mate.joinMember,
                },
                (_, index) => (
                  <img
                    className="w-9 rounded-xl opacity-100"
                    key={index}
                    src={PresentMember}
                    alt="프로필 이미지"
                  />
                )
              )}
              {Array.from(
                {
                  length: mate.maxMember - mate.joinMember,
                },
                (_, index) => (
                  <img
                    className="w-9 rounded-xl opacity-100"
                    key={index + mate.joinMember}
                    src={NotPresentMember}
                    alt="프로필 이미지"
                  />
                )
              )}
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
}

export default MateCard;
