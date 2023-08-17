import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";

const ReviewDelete = ({ reviewId, userId, reviewDelete }) => {
  const accessToken = localStorage.getItem("accessToken");

  const handleDelete = async () => {
    console.log(reviewId);
    console.log(typeof reviewId);
    try {
      const response = await fetch(
        `https://busanwavrserver.store/tour/review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.status === 200) {
        reviewDelete(reviewId);
        alert(data.message);
        //   location.replace(`http://127.0.0.1:5173/user/${userId}/mypage/review`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      className="mt-3 p-3 rounded-md w-full"
      color="danger"
      variant="flat"
      onClick={handleDelete}
    >
      리뷰 삭제하기
    </Button>
  );
};

export default ReviewDelete;
