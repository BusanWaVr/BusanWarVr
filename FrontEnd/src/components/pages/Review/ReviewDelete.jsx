import React from "react";

const ReviewDelete = ({ reviewId }) => {

  const accessToken = localStorage.getItem('accessToken');

  const handleDelete = async () => {
    console.log(reviewId);
    console.log(typeof reviewId)
    try {
        const response = await fetch(`http://52.79.93.203/tour/review/${reviewId}`, {
            method: "DELETE",
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log(data)
        if (data.status === 200) {
          alert(data.message);
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
