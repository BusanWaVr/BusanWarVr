import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FollowingCard from "../../blocks/FollowingCard";

function UserFollowingBoard() {
  const [followingData, setFollowingData] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://busanwavrserver.store/user/following/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setFollowingData(data.data.guides);
        console.log(data.data.guides);
      } else {
        alert("위시데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {followingData ? (
        <FollowingCard followingData={followingData} />
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
}

export default UserFollowingBoard;
