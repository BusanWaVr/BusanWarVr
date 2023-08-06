import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import UserTourNavbar from "./UserTourNavbar";

function UserTourBoard() {
  const [userTourData, setUserTourData] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const { userId } = useParams();


  // 토큰 말고 userId받게 수정해야함
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://52.79.93.203/user/tour/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          console.log("유저투어데이터 받았어요");
          const data = await response.json();
          setUserTourData(data.data);
          console.log("예정종료취소로 잘감?", userTourData);
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
      <h1>유저 투어 보드</h1>
      <UserTourNavbar />
      <Outlet context={{ userTourData }} />
    </div>
  );
}

export default UserTourBoard;
