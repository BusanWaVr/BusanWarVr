import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import GuideTourCard from "../../blocks/GuideTourCard";
import { toast } from "react-toastify";

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
          `https://busanwavrserver.store/guide/${urlId}/tour/end`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          const TourData = data.data;
          const GuideTour = TourData.endedTours;
          const uniqueTourIds = [
            ...new Set(GuideTour.map((item) => item.tourId)),
          ];
          const uniqueTours = uniqueTourIds.map((uniqueTourId) => {
            return GuideTour.find((item) => item.tourId === uniqueTourId);
          });
          setGuideTourData(uniqueTours);
        } else {
          toast.error(
            "투어데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <GuideTourCard TourData={guideTourData} isMe={isMe} />
    </div>
  );
}

export default GuideEndedBoard;
