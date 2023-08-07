import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import TourCard from "../../blocks/GuideTourCard";

function GuideEndedBoard() {
  const { urlId } = useParams();
  const { isMe } = useOutletContext();
  const [guideTourData, setGuideTourData] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      fetchData();
      setShouldReload(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://52.79.93.203/guide/${urlId}/tour/end`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          console.log("가이드 지난정보를 받았어요");
          const data = await response.json();
          const TourData = data.data;
          const GuideTour = TourData.endedTours;
          setGuideTourData(GuideTour);
          console.log("guideTourData", guideTourData);
        } else {
          alert("투어데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <TourCard TourData={guideTourData} isMe={isMe} />
    </div>
  );
}

export default GuideEndedBoard;
