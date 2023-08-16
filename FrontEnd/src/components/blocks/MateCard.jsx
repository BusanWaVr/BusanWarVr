import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n";
import NotPresentMember from "../../assets/boogie_notPresent.jpg";
import PresentMember from "../../assets/boogie_present.jpg";

const CardContainer = styled.div`
  height: 150px;
  border-radius: 15px;
  border: 1px solid #1983ff;
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
          >
            <p className="text-xs font-semibold">
              {mate.joinMember} / {mate.maxMember}
            </p>
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
                    className="w-9 rounded-xl opacity-80"
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
                    className="w-9 rounded-xl opacity-50"
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
