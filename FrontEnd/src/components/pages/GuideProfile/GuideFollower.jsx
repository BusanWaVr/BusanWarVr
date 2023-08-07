import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FollowerCard from "../../blocks/FollowerCard.jsx";

function GuideFollower() {
  const { guideInfoData } = useOutletContext();

  const [followerData, setFollowerData] = useState([]);
  const guideId = guideInfoData.userId;

  const url = `https://busanwavrserver.store/guide/follower/${guideId}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.status === 200) {
        console.log("가이드 팔로워목록 받음");
        const data = await response.json();
        console.log(data);
        setFollowerData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("가이드 내 정보에서 받고 있음", guideInfoData);
  }, []);

  return (
    <div>
      <h1>가이드 팔로워 목록</h1>
      {followerData ? (
        <div>
          <FollowerCard followerData={followerData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GuideFollower;
