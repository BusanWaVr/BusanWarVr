import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useParams, useNavigate } from "react-router-dom";
import UserVideoComponent from "../components/livestream/UserVideoComponent";
import Toolbar from "../components/livestream/Toolbar";
import LiveExample from "../components/livestream/LiveExample.jsx";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

function LiveStreamView() {
  const navigate = useNavigate();
  const { params } = useParams();
  const [mySessionId, setMySessionId] = useState(params);
  const [myUserName, setMyUserName] = useState();
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [publisherVideoEnabled, setPublisherVideo] = useState(false);
  const [publisherAudioEnabled, setPublisherAudio] = useState(false);

  const OV = useRef(new OpenVidu());

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  useEffect(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
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
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
    }
  }, [session, myUserName, mySessionId]);

  // 라이브 종료
  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    navigate("/livestream");
  }, [session]);

  // 카메라 전환
  const switchCamera = useCallback(async () => {
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
            publishAudio: true,
            publishVideo: true,
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

  // 카메라 온오프
  const toggleCamera = () => {
    if (publisherVideoEnabled) {
      setPublisherVideo(false);
    } else {
      setPublisherVideo(true);
    }

    publisher.publishVideo(publisherVideoEnabled);
  };

  // 마이크 온오프
  const toggleAudio = () => {
    if (publisherAudioEnabled) {
      setPublisherAudio(false);
    } else {
      setPublisherAudio(true);
    }

    publisher.publishAudio(publisherAudioEnabled);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <>
      <LiveExample className="live-example" />
      <div id="session">
        <div className="video-slider" style={{ width: "1200px" }}>
          <Slider id="video-container" className="" {...settings}>
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
      <Toolbar
        leaveSession={leaveSession}
        switchCamera={switchCamera}
        toggleCamera={toggleCamera}
        toggleAudio={toggleAudio}
        publisherVideoEnabled={publisherVideoEnabled}
        publisherAudioEnabled={publisherAudioEnabled}
      />
    </>
  );
}

export default LiveStreamView;
