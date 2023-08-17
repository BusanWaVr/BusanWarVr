import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n";
import MainTourCard from "./MainTourCard";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import styles from "./TourRecoCard.module.css";

const ScrollList = styled.div`
  width: 100vw;
  height: 350px;
  white-space: nowrap;
  gap: 40px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  & button {
    width: 100%;
    height: 100%;
  }
  position: relative;
  z-index: 5;
`;

function TourRecoCard({ tourRecoData }) {
  const t = useI18n();

  const ref = useRef();
  const { events } = useDraggable(ref);

  console.log(tourRecoData);
  return (
    <div>
      <ScrollList className="flex h-full p-6" {...events} ref={ref}>
        {tourRecoData ? (
          tourRecoData.length > 0 ? (
            tourRecoData.map((tour, index) => (
              <div style={{ width: "300px" }}>
                <MainTourCard tour={tour} index={index} t={t} />
              </div>
            ))
          ) : (
            <p>{t(`투어 데이터가 없습니다`)}</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </ScrollList>
      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default TourRecoCard;
