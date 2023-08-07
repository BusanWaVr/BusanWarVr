import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import TourCard from "../../blocks/GuideTourCard";

function GuideCanceledBoard() {
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
        const response = await fetch(`/api/guide/${urlId}/tour/canceled`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.status === 200) {
          console.log("가이드 취소정보를 받았어요");
          const data = await response.json();
          const TourData = data.data;
          const GuideTour = TourData.tourDtoList;
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
    // window.location.reload();
  }, []);
  return (
    <div>
      <TourCard TourData={guideTourData} isMe={isMe} />
    </div>
  );
}

export default GuideCanceledBoard;
