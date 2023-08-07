import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function FollowBtn(guideInfoData) {
  const [follow, setFollow] = useState(false);
  const userId = guideInfoData.guideInfoData.userId;

  //   useEffect(() => {
  //     // 여기서 DB에서 사용자의 팔로우 상태를 가져오는 로직을 추가하세요
  //     // 예를 들어, fetch를 사용하여 팔로우 상태를 가져올 수 있습니다.
  //     const fetchFollowStatus = async () => {
  //       try {
  //         const accessToken = localStorage.getItem("accessToken");
  //         if (!accessToken) {
  //           return;
  //         }

  //         const response = await fetch(`http://52.79.93.203/user/${userId}`, {
  //           method: "POST",
  //           headers: {
  //             Authorization: accessToken,
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         const data = await response.json();
  //         console.log("팔로우 상태:", data);
  //         if (data.message === ""
  //         console.log(userId);

  //         // 팔로우 상태에 따라 follow 상태 설정
  //         setFollow(data.followStatus);
  //       } catch (error) {
  //         console.error("팔로우 상태 가져오기 오류", error);
  //       }
  //     };

  //     fetchFollowStatus();
  //   }, [userId]);

  const changeFollow = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "http://52.79.93.203";
        return;
      }

      const response = await fetch(`http://52.79.93.203/user/${userId}`, {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data", data);
      console.log("userId", userId);
      console.log("response", response);
      if (
        response.status === 200 &&
        data.message === "성공적으로 가이드를 팔로우했습니다."
      ) {
        console.log("가이드를 팔로우했습니다.");
        setFollow(true);
      } else if (
        response.status === 200 &&
        data.message === "성공적으로 가이드를 언팔로우했습니다."
      ) {
        console.log("가이드를 언팔로우했습니다.");
        setFollow(false);
      } else {
        console.log("팔로우 요청 실패");
      }
    } catch (error) {
      console.error("팔로우 오류", error);
    }
  };

  return (
    <div>
      {follow && <button onClick={changeFollow}>팔로우</button>}
      {!follow && <button onClick={changeFollow}>언팔로우</button>}
    </div>
  );
}

export default FollowBtn;
