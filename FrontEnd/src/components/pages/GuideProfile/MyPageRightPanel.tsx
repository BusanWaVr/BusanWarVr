// MyPageRightPanel.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GuideData, ScheduledTour } from "./types";
import "./MyPageRightPanel.css";

interface MyPageRightPanelProps {
  guide: GuideData;
}

const MyPageRightPanel: React.FC<MyPageRightPanelProps> = ({ guide }) => {
  const [selectedTab, setSelectedTab] = useState<string>("scheduled");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const getFilteredTours = (): ScheduledTour[] => {
    if (selectedTab === "scheduled") {
      console.log("예정된 투어", guide.scheduledTours);
      return guide.scheduledTours;
    } else if (selectedTab === "ended") {
      console.log("지난 투어", guide.endedTours);
      return guide.endedTours;
    } else if (selectedTab === "cancelled") {
      console.log("취소된 여행");
      return [];
    }
    return [];
  };

  return (
    <div className="my-page-right-panel">
      <h2>내 여행</h2>
      <div className="tabs">
        <button
          className={selectedTab === "scheduled" ? "active" : ""}
          onClick={() => handleTabClick("scheduled")}
        >
          예정된 여행
        </button>
        <button
          className={selectedTab === "ended" ? "active" : ""}
          onClick={() => handleTabClick("ended")}
        >
          지난 여행
        </button>
        <button
          className={selectedTab === "cancelled" ? "active" : ""}
          onClick={() => handleTabClick("cancelled")}
        >
          취소된 여행
        </button>
      </div>
      <div className="tour-cards">
        {getFilteredTours().map((tour) => (
          <div key={tour.tourId} className="tour-card">
            <Link to={`/tour/${tour.tourId}`}>
              <img src={tour.image} alt={tour.title} />
              <h4>{tour.title}</h4>
            </Link>
            <Link to={`/tour/${tour.tourId}/update`} className="edit-button">
              수정하기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageRightPanel;
