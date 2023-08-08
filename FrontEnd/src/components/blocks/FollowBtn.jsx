import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FollowBtn(guideInfoData) {
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false); // 초기값을 false로 설정
  const userId = guideInfoData.guideInfoData.userId;
  const [followerNumCheck, setFollowerNumCheck] = useState(false);
  const followNum = guideInfoData.guideInfoData.followerNum;
  const [followerNum, setFollowerNum] = useState(followNum);
  console.log("팔로우userId", userId);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return;
        }

        const response = await fetch(
          `https://busanwavrserver.store/user/${userId}/follow`,
          {
            method: "GET",
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("팔로우 상태", data.data);

        // DB에서 가져온 값에 따라 follow의 초기값 설정
        if (data.data) {
          setFollow(true);
          setFollowerNumCheck(true);
        }
        // setFollow(data.data === "true");
      } catch (error) {
        console.error("팔로우 상태 가져오기 오류", error);
      }
    };

    fetchFollowStatus();
  }, []);

  const changeFollow = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/");
        return;
      }

      const response = await fetch(
        `https://busanwavrserver.store/user/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log("data", data);
      // console.log("userId", userId);
      // console.log("response", response);
      if (
        response.status === 200 &&
        data.message === "성공적으로 가이드를 팔로우했습니다."
      ) {
        console.log("가이드를 팔로우했습니다.");
        setFollow(true);
        console.log("팔로우수", followerNum);
        if (followerNumCheck) {
          setFollowerNum(followerNum);
          setFollowerNumCheck(true);
        } else {
          setFollowerNum(followerNum + 1);
          setFollowerNumCheck(true);
        }
      } else if (
        response.status === 200 &&
        data.message === "성공적으로 가이드를 언팔로우했습니다."
      ) {
        console.log("가이드를 언팔로우했습니다.");
        setFollow(false);
        if (followerNumCheck) {
          setFollowerNum(followerNum - 1);
          setFollowerNumCheck(false);
        } else {
          setFollowerNum(followerNum);
          setFollowerNumCheck(false);
        }
      } else {
        console.log("팔로우 요청 실패");
      }
    } catch (error) {
      console.error("팔로우 오류", error);
    }
  };
  console.log("로딩 당시 follow", follow);
  return (
    <div>
      {/* {!follow && <button onClick={changeFollow}>언팔로우</button>}
      {follow && <button onClick={changeFollow}>팔로우</button>} */}
      <p>팔로워 : {followerNum}</p>
      {follow ? (
        <button onClick={changeFollow}>언팔로우</button>
      ) : (
        <button onClick={changeFollow}>팔로우</button>
      )}
    </div>
  );
}

export default FollowBtn;
