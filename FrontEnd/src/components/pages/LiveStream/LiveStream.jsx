import React, { useCallback, useState } from "react";
import { useData } from "../../../store/DataContext";
import { useNavigate } from "react-router-dom";
import "./LiveStream.css";

const LiveStream = () => {
  const navigate = useNavigate();

  const [mySessionId, setMySessionId] = useState("busanVR");
  const {
    youtubeLink,
    setYouTubeLink,
    userName,
    setUserName,
    isAudioEnabled,
    setIsAudioEnabled,
    isVideoEnabled,
    setIsVideoEnabled,
  } = useData();

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e) => {
    setUserName(e.target.value);
  }, []);

  const handleChangeYouTubeLink = useCallback((e) => {
    setYouTubeLink(e.target.value);
  }, []);

  // 마이크 온오프 설정 함수
  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  // 카메라 온오프 설정 함수
  const toggleVideo = () => {
    setIsVideoEnabled((prev) => !prev);
  };

  const joinSession = (e) => {
    navigate(`/livestream/${mySessionId}`);
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
                value={userName}
                onChange={handleChangeUserName}
                required
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
              <span>세션코드</span>
            </label>
            <label>
              <input
                className="form-control input"
                type="text"
                id="sessionId"
                value={youtubeLink}
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
            <button className="button submit" name="commit" type="submit">
              JOIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
