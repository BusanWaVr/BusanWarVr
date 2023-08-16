import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./LiveStream.module.css";
import TestCamera from "../Test/TestCamera.jsx";
import BlackCamera from "../Test/BlackCamera.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setYoutubeLink,
  setIsAudioEnabled,
  setIsVideoEnabled,
} from "./LiveStreamReducer";

function LiveStream(props) {
  const navigate = useNavigate();

  const { youtubeLink, isAudioEnabled, isVideoEnabled, tourId, tourUID } =
    useSelector((state) => state.liveStream);
  const { nickname } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  // api 호출용 tourId
  const [apitourId, setApiTourId] = useState(`${tourId}`);
  // tourUId
  const [mySessionId, setMySessionId] = useState(`${tourUID}`);
  const [isDisableCamera, setIsDisableCamera] = useState(false);

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
    setIsDisableCamera(!isDisableCamera);
    console.log(isDisableCamera);
    dispatch(setIsVideoEnabled(!isVideoEnabled));
  };

  const joinSession = () => {
    navigate(`/livestream/${mySessionId}`);
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
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }

      const requestBody = {
        tourId: tourId,
      };

      const response = await fetch(
        "https://busanwavrserver.store/chatroom/start",
        {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        alert(data.message);
        console.log("다음 채팅방이 시작되었습니다", tourId);
      } else {
        console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className={`${styles.joinDialog} jumbotron vertical-center`}>
          <form className={styles.form} onSubmit={joinSession}>
            <p className={styles.title}>Let's take a trip! </p>
            <p className={styles.message}>신나는 온라인 VR 투어를 떠나보자. </p>
            <div className={styles.settingmain}>
              <div className={styles.leftSetting}>
              {isDisableCamera ? <BlackCamera/> : <TestCamera isDisable={isDisableCamera}/>}
              <div className={styles.livestreamFlex}>
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
              </div>
              <div className={styles.rightSetting}>
                <div>
                  {nickname}
                </div>
                <button
                className="button submit"
                name="commit"
                type="submit"
                onClick={saveYouTubeLink}
                >
                  Join
                </button>
              </div>
              
            </div>
            
           {/* { <label>
              <input
                className={`form-control ${styles.input}`}
                type="text"
                id="userName"
                value={nickname}
                disabled
              />
              <span>닉네임</span>
            </label>

            <div>
              
            </div>
            <label>
              <input
                className={`form-control ${styles.input}`}
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
                className={`form-control ${styles.input}`}
                type="text"
                id="sessionId"
                value={youtubeLink}
                onChange={handleChangeYouTubeLink}
                required
              />
              <span>라이브 스트리밍 링크</span>
            </label>} */}
           
          </form>
        </div>
      </div>
    </>
  );
}

export default LiveStream;
