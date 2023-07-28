import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import Slider from "react-slick";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import UserVideoComponent from "../components/livestream/UserVideoComponent";
import Toolbar from "../components/livestream/Toolbar";
import LiveExample from "../components/livestream/LiveExample";
import Loader from "../components/common/Loader";
import { useData } from "../context/DataContext";
import useCustomBack from "../hooks/useCustomBack";
import ChatRoom from "./ChatRoom";
import "./LiveStreamView.css";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

const LiveStreamView = () => {
  const navigate = useNavigate();
  const { sessionid } = useParams();

  const {
    userName,
    youtubeLink,
    isAudioEnabled,
    setIsAudioEnabled,
    isVideoEnabled,
    setIsVideoEnabled,
  } = useData();

  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [onload, setOnload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  const OV = useRef(new OpenVidu());

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const extractVideoIdFromLink = (link) => {
    const regex = /(?:\?v=)([^&]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoIdFromLink(youtubeLink);

  useEffect(() => {
    const mySession = OV.current.initSession();

    const handleStreamCreated = (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    };

    const handleStreamDestroyed = (event) => {
      deleteSubscriber(event.stream.streamManager);
    };

    const handleException = (exception) => {
      console.warn(exception);
    };

    mySession.on("streamCreated", handleStreamCreated);
    mySession.on("streamDestroyed", handleStreamDestroyed);
    mySession.on("exception", handleException);

    setSession(mySession);
    setOnload(true);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 해제하고 subscribers를 초기화
      mySession.off("streamCreated", handleStreamCreated);
      mySession.off("streamDestroyed", handleStreamDestroyed);
      mySession.off("exception", handleException);
      mySession.disconnect();
      setSubscribers([]);
    };
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: userName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: isAudioEnabled,
            publishVideo: isVideoEnabled,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);

          setIsLoading(false);
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
    }
  }, [session, userName, sessionid]);

  // 라이브 종료
  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    navigate("/livestream");
  }, [session]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useCustomBack(leaveSession);

  // 카메라 전환
  const switchVideo = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: isAudioEnabled,
            publishVideo: isVideoEnabled,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

  // subscriber 삭제
  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  // 카메라 온오프
  const toggleVideo = () => {
    setIsVideoEnabled((prev) => !prev);

    publisher.publishVideo(!isVideoEnabled);
  };

  // 마이크 온오프
  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);

    publisher.publishAudio(!isAudioEnabled);
  };

  // 전체화면 온오프
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  const handleFullScreen = useFullScreenHandle();
  const toggleFullScreen = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
      handleFullScreen.exit();
    } else {
      setIsFullScreen(true);
      handleFullScreen.enter();
    }
  };

  const handleChatToggle = () => {
    setIsChatOpen((prev) => !prev);
  };

  const getToken = useCallback(async () => {
    return createSession(sessionid).then((sessionId) => createToken(sessionId));
  }, [sessionid]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FullScreen handle={handleFullScreen}>
          <LiveExample className="live-example" videoId={videoId} />
          <div id="session">
            <div className="video-slider" style={{ width: "1200px" }}>
              <Slider id="video-container" className="" {...sliderSettings}>
                {/* 현재 유저 화면 */}
                {publisher !== undefined ? (
                  <div
                    className="stream-container current-stream"
                    onClick={() => handleMainVideoStream(publisher)}
                    style={{ width: "200px" }}
                  >
                    <UserVideoComponent streamManager={publisher} />
                  </div>
                ) : null}
                {/* 다른 유저 화면 */}
                {subscribers.map((sub, i) => (
                  <div
                    key={sub.id}
                    className="stream-container"
                    onClick={() => handleMainVideoStream(sub)}
                    style={{ width: "200px" }}
                  >
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/* 채팅창 */}
          <div className={`chat-room ${isChatOpen ? "open" : ""}`}>
            <ChatRoom onload={onload} />
          </div>
          {/* 툴바 */}
          <Toolbar
            leaveSession={leaveSession}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            switchVideo={switchVideo}
            toggleFullScreen={toggleFullScreen}
            isFullScreen={isFullScreen}
            isChatOpen={isChatOpen}
            handleChatToggle={handleChatToggle}
          />
        </FullScreen>
      )}
    </>
  );
};

export default LiveStreamView;
