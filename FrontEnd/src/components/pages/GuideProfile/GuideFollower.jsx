import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FollowerCard from "../../blocks/FollowerCard.jsx";

function GuideFollower() {
  const { guideInfoData } = useOutletContext();
  const { urlId } = useParams();

  const [followerData, setFollowerData] = useState([]);

  const url = `https://busanwavrserver.store/guide/follower/${urlId}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.status === 200) {
        const data = await response.json();
        setFollowerData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full">
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
