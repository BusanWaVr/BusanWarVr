import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LiveStream.css";

import { useSelector, useDispatch } from "react-redux";
import {
  setYoutubeLink,
  setIsAudioEnabled,
  setIsVideoEnabled,
  setTourId,
  setTourUID,
} from "./LiveStreamReducer";

function LiveStream(props) {
  const location = useLocation();
  const tourUID = location.state ? location.state.tourUID : "";
  const tourId = location.state ? location.state.tourId : "";
  const liveLink = location.state ? location.state.liveLink : "";
  console.log("liveLink", liveLink);
  console.log("tourId", tourId);
  console.log("tourUID", tourUID);
  const navigate = useNavigate();

  const { youtubeLink, isAudioEnabled, isVideoEnabled } = useSelector(
    (state) => state.liveStream
  );
  const { nickname } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  // 디폴트 youtubeLink 세팅
  // setYoutubeLink(liveLink);
  // console.log("youtubeLink", youtubeLink);

  // api 호출용 tourId
  const [apitourId, setApiTourId] = useState(`${tourId}`);
  console.log("apitourId", apitourId);
  // tourUId
  const [mySessionId, setMySessionId] = useState(`${tourId}`);


  // location.state로 받아온 데이터들 reducer에 저장
  useEffect(() => {
    dispatch(setTourId(tourId));
    dispatch(setTourUID(tourUID));
  }, [dispatch, tourId, tourUID]);

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);


  const handleChangeYouTubeLink = useCallback((e) => {
    dispatch(setYoutubeLink(e.target.value));
  }, []);

  // 마이크 온오프 설정 함수
  const toggleAudio = () => {
    dispatch(setIsAudioEnabled(!isAudioEnabled));
  };

  // 카메라 온오프 설정 함수
  const toggleVideo = () => {
    dispatch(setIsVideoEnabled(!isVideoEnabled));
  };

  const joinSession = () => {
    navigate(`/livestream/${mySessionId}`)
  };

  const saveYouTubeLink = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }

      const linkData = {
        link: youtubeLink,
      };

      const response = await fetch(
        `https://busanwavrserver.store/tour/link/${tourId}`,
        {
          method: "PUT",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(linkData),
        }
      );
    } catch (error) {
      console.error("유튜브 Url 등록실패", error);
    }

    try {
      const requestBody = {
        tourId: tourId,
      };

      const response = await fetch("/api/chatroom/start", {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("요청", requestBody);
        console.log("응답", data);
        alert(data.message);
      } else {
        console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="_container">
      <div id="join">
        <div id="join-dialog" className="jumbotron vertical-center">
          <form className="form" onSubmit={joinSession}>
            <p className="title">Let's take a trip! </p>
            <p className="message">신나는 온라인 VR 투어를 떠나보자. </p>

            <label>
              <input
                className="form-control input"
                type="text"
                id="userName"
                value={nickname}
                disabled
              />
              <span>닉네임</span>
            </label>

            <label>
              <input
                className="form-control input"
                type="text"
                id="sessionId"
                value={mySessionId}
                onChange={handleChangeSessionId}
                required
              />
              <span>tourId를 입력해주세요</span>
            </label>
            <label>
              <input
                className="form-control input"
                type="text"
                id="sessionId"
                value={youtubeLink || liveLink}
                onChange={handleChangeYouTubeLink}
                required
              />
              <span>라이브 스트리밍 링크</span>
            </label>
            <div className="flex">
              {/* 카메라 온오프 설정 */}
              <p>
                <button type="button" onClick={toggleVideo}>
                  {isVideoEnabled ? "카메라 켜짐" : "카메라 꺼짐"}
                </button>
              </p>
              {/* 마이크 온오프 설정 */}
              <p>
                <button type="button" onClick={toggleAudio}>
                  {isAudioEnabled ? "마이크 켜짐" : "마이크 꺼짐"}
                </button>
              </p>
            </div>
            <button
              className="button submit"
              name="commit"
              type="submit"
              onClick={saveYouTubeLink}
            >
              JOIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LiveStream;
