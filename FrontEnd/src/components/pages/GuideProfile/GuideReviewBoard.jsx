import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useI18n } from "../../../hooks/useI18n";
import GuideReviewCard from "./GuideReviewCard";

function GuideReviewBoard() {
  const t = useI18n();
  const { urlId } = useParams();
  const { isMe } = useOutletContext();
  const [guideReviewData, setGuideReviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/guide/${urlId}/tour/review`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          const ReviewData = data.data.reviews;

          setGuideReviewData(ReviewData);
        } else {
          toast.error(
            "리뷰데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div class="h-full flex w-full flex-col items-center">
      <GuideReviewCard ReviewData={guideReviewData} />
    </div>
  );
}

export default GuideReviewBoard;
