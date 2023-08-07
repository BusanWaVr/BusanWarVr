import React, { useState } from "react";

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

  return <button onClick={handleDelete}>삭제</button>;
};

export default ReviewDelete;
