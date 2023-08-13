import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import Slider from "react-slick";
import React, {
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import UserVideoComponent from "./UserVideoComponent";
import Toolbar from "./Toolbar";
import LiveExample from "./LiveExample";
import Loader from "../../atoms/Loader";
import useCustomBack from "../../../hooks/useCustomBack";
import ChatRoom from "./ChatRoom";
import QRCodeComponent from "./QRCodeComponent";
import VoteModal from "./VoteModal";

import "./LiveStreamView.css";
import TestTest from "../Test/TestTest";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";

import { useSelector, useDispatch } from "react-redux";
import {
  setIsAudioEnabled,
  setIsVideoEnabled,
  setIsFullScreen,
  setIsChatOpen,
  setStompClient,
} from "./LiveStreamReducer";

const APPLICATION_SERVER_URL = "https://busanopenvidu.store/api/v1/openvidu";

const LiveStreamView = () => {
  const navigate = useNavigate();

  const {
    youtubeLink,
    isAudioEnabled,
    isVideoEnabled,
    isFullScreen,
    isChatOpen,
    tourId,
    // tourUID,
    stompClient,
  } = useSelector((state) => state.liveStream);
  const { nickname } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  // 그냥 모든 sessionid => tourId로 바꿔주면 되는데 무서워서 일단 이렇게
  // const sessionid = tourId 로 하니까 채팅은 되는데 오픈비두가 안됨..
  const { sessionid } = useParams();
  const tourUID = sessionid

  // 투표
  const [voting, setVoting] = useState(false);
  const [column1, setColumn1] = useState("");
  const [column2, setColumn2] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [column1Cnt, setColumn1Cnt] = useState(0);
  const [column2Cnt, setColumn2Cnt] = useState(0);


  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [onload, setOnload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [onConnect, setOnConnect] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  // accessToken
  const accessToken = localStorage.getItem("accessToken");

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
    dispatch(
      setStompClient(
        Stomp.over(new SockJS("https://busanwavrserver.store/ws-stomp"))
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, () => {
        console.log("연결됨");
        setOnConnect(true);
        subscribeVote(stompClient);
        subscribeVoteCnt(stompClient);
      });
    }
  }, [stompClient]);

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
          await session.connect(token, { clientData: nickname });

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
  }, [session, nickname, sessionid]);

  // 라이브 종료
  const leaveSession = useCallback(async () => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    onLeaveChat();

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
    dispatch(setIsVideoEnabled(!isVideoEnabled));
    publisher.publishVideo(!isVideoEnabled);
  };

  // 마이크 온오프
  const toggleAudio = () => {
    dispatch(setIsAudioEnabled(!isAudioEnabled));
    publisher.publishAudio(!isAudioEnabled);
  };

  // 전체화면 온오프
  useEffect(() => {
    console.log("tourId:", tourId, "tourUID:", tourUID, "세션아이디", sessionid)

    const handleFullscreenChange = () => {
      dispatch(setIsFullScreen(!!document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleFullScreen = useFullScreenHandle();

  const toggleFullScreen = () => {
    if (isFullScreen) {
      dispatch(setIsFullScreen(false));
      handleFullScreen.exit(); // 전체화면 종료
    } else {
      dispatch(setIsFullScreen(true));
      handleFullScreen.enter(); // 전체화면 시작
    }
  };

  const handleLeaveChatToggle = () => {
    dispatch(setIsChatOpen(false));
  };

  const handleJoinChatToggle = () => {
    dispatch(setIsChatOpen(true));
  };

  // 채팅방 나가기, 재입장 호출

  const chatRoomRef = useRef(null);

  const onLeaveChat = () => {
    console.log("Leave chat");
    if (chatRoomRef.current) {
      chatRoomRef.current.handleLeaveChat();
    }
  };

  const onJoinChat = () => {
    console.log("join chat");
    if (chatRoomRef.current) {
      chatRoomRef.current.handleJoinChat();
    }
  };

  // 투표하기(init)호출
  const initRef = useRef(null);

  // 가이드가 투표 시작을 하면, setVoting(true)가 되면서 TestTest의 init 실행시키기
  useEffect(() => {
    if (voting) {
      console.log("투표시작");
      if (initRef.current) {
        console.log("여기까지들어가는지궁금해서");
        initRef.current.init();
      }
    } else {
      console.log("투표종료");
    }
  }, [voting]);


  // 투표함 생성 받기(SUB)
  function subscribeVote(stomp) {
    stomp.subscribe(`/sub/chat/vote/create/room/${tourUID}`,
    (data) => {
      const received = JSON.parse(data.body);
      const receivedMessage = {
        column1 : received.column1,
        column2 : received.column2,
      }
      setOption1(received.column1)
      setOption2(received.column2)
      console.log("투표 구독으로 받아오는 메시지", receivedMessage);
    },
    { id: "subVote" }
    )
  };

  const onChangeColumn1 = (e) => {
    setColumn1(e.target.value);
  }

  const onChangeColumn2 = (e) => {
    setColumn2(e.target.value);
  }

  const createVote = async () => {
    // 투표함 생성(POST)
    try {
      const requestBody = {
        roomUid: tourUID,
        column1: column1,
        column2: column2,
      };

      const response = await fetch(
        "https://busanwavrserver.store/chat/vote/create",
        {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log(requestBody);

      if (response.status === 200) {
        console.log("제대로왔음", response);
        setColumn1("");
        setColumn2("");
      } else {
        // 에러
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 사용자 투표 실시간 받기
  function subscribeVoteCnt(stomp) {
    stomp.subscribe(`/sub/chat/vote/room/${tourUID}`,
    (data) => {
      const received = JSON.parse(data.body);
      const receivedMessage = {
        nickname : received.sender.nickname,
        option : received.selectType,
      }
      console.log("사용자 투표로 받아오는 메시지", receivedMessage);
      if (received.selectType == 1) {
        setColumn1Cnt(column1Cnt+1);
      } else {
        setColumn2Cnt(column2Cnt+1);
      }
    },
    { id: "voteCnt" }
    )
  };


  const getToken = useCallback(async () => {
    return createSession(sessionid).then((sessionId) => createToken(sessionId));
  }, [sessionid]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/" + sessionId + "/connections",
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
            <ChatRoom ref={chatRoomRef} onload={onload} onConnect={onConnect} tourUID={tourUID}/>
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
            handleLeaveChatToggle={handleLeaveChatToggle}
            handleJoinChatToggle={handleJoinChatToggle}
            onLeaveChat={onLeaveChat}
            onJoinChat={onJoinChat}
          />
          <QRCodeComponent youtubeLink={youtubeLink} />
          <button
            onClick={() => {
              setVoting(true);
            }}
          >
            여기
          </button>{" "}
          <input type="text" placeholder="1번 선택지" value={column1}
          onChange={onChangeColumn1}
          />
          <input type="text" placeholder="2번 선택지" value={column2}
          onChange={onChangeColumn2}
          />
          <button onClick={createVote}>투표 시작하기</button>
          <TestTest ref={initRef} tourUID={tourUID} accessToken={accessToken}/> : <></>
          <VoteModal option1={option1} option2={option2} column1Cnt={column1Cnt} column2Cnt={column2Cnt}/>
        </FullScreen>
      )}
    </>
  );
};

export default LiveStreamView;
