import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatRoom.module.css";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { useSelector, useDispatch } from "react-redux";
import { setStompClient } from "./LiveStreamReducer";
import { image } from "@nextui-org/react";
import microphone from "../../../assets/microphone.gif";
export type message = {
  username: string;
  content: string;
};

function ChatRoom(props, ref) {
  
  const stompClient = props.stompClient;

  // reducer에서 데이터 가져오기
  const { isListening } = useSelector(
    (state) => state.liveStream
  );
  const { accessToken, userId } = useSelector((state: any) => state.userInfo);
  const tourUID = props.tourUID;

  // 구독 상태를 관리해보자
  const [subscribed, setSubscribed] = useState(false);

  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  // 자동 스크롤
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    rnehr();

    // 입장메시지 send
    const joinMessage = {
      roomUid: tourUID,
      token: accessToken,
    };
    stompClient.send("/pub/chat/message/join", {}, JSON.stringify(joinMessage));

    console.log(stompClient);
    console.log(props.onConnect);
  }, []);

  // 구독하기
  const rnehr = () => {
    stompClient.subscribe(
      `/sub/chat/message/room/${tourUID}`,
      (data) => {
        const receivedMessage = JSON.parse(data.body);
        const newChatMessage = {
          msgType: receivedMessage.type,
          userType: receivedMessage.sender.type,
          senderId: receivedMessage.sender.id,
          username: receivedMessage.sender.nickname,
          content: receivedMessage.body,
        };

        setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
      },
      { id: "chat" }
    );
    setSubscribed(true);
  };

  // 구독해제
  const gowp = () => {
    stompClient.unsubscribe(`chat`);
    const stopmClientSave = stompClient;
  };

  // 메시지 보내기
  const handleEnter = () => {
    scrollToBottom();

    const newMessage = {
      roomUid: tourUID,
      token: accessToken,
      message: inputMessage,
    };

    stompClient.send(
      "/pub/chat/message/normal",
      {},
      JSON.stringify(newMessage)
    );
    setInputMessage("");
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputMessage) {
      handleEnter();
    }
  };

  // 채팅방 나가기
  const handleLeaveChat = () => {
    const leaveMessage = {
      roomUid: tourUID,
      token: accessToken,
    };
    stompClient.send(
      "/pub/chat/message/leave",
      {},
      JSON.stringify(leaveMessage)
    );

    // 채팅방 나가면서 구독 해제
    gowp();
  };

  // 채팅방 재입장
  const handleJoinChat = () => {
    // 재입장하면서 다시 구독
    rnehr();

    const joinMessage = {
      roomUid: tourUID,
      token: accessToken,
    };
    stompClient.send("/pub/chat/message/join", {}, JSON.stringify(joinMessage));
  };

  // 부모에서 호출할 함수
  React.useImperativeHandle(ref, () => ({
    handleLeaveChat: handleLeaveChat,
    handleJoinChat: handleJoinChat,
  }));

  return (
    <div className="w-full h-full text-black">
      <div className={`h-full ${styles.chatCard}`}>
        <div className="chat-header bg-zinc-900">
          <div className="h2 text-white font-semibold p-4 px-6 text-left">
            채팅
          </div>
        </div>
        <div
          className={`${styles.chatBody} h-full w-full`}
          ref={messageEndRef}
          style={{ height: "calc(100% - 200px)" }}
        >
          {chatMessages.map((msg, index) => {
            switch (msg.msgType) {
              case "LEAVE":
                return (
                  <p className={`${styles.leave}`} key={index}>
                    {msg.username}님이 채팅방에서 퇴장했습니다.
                  </p>
                );
              case "JOIN":
                return (
                  <p className={`${styles.join}`} key={index}>
                    {msg.username}님이 채팅방에 입장했습니다.
                  </p>
                );
              case "VOTE":
                return (
                  <p className={`${styles.vote}`} key={index}>
                    {msg.username}님이 {msg.content}번에 투표했습니다.
                  </p>
                );
              default:
                return (
                  <div key={index}>
                    {msg.senderId == userId ? (
                      <p
                        className={`${styles.message} ${styles.outgoing}`}
                        key={index}
                      >
                        {msg.content}
                      </p>
                    ) : (
                      <p
                        className={`${styles.message} ${styles.incoming}`}
                        key={index}
                      >
                        <strong>{msg.username}</strong> | {msg.content}
                      </p>
                    )}
                  </div>
                );
            }
          })}
        </div>
        <div className="absolute w-full">
          <div className={`${styles.chatFooter}`}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleEnterPress}
              placeholder="메세지를 입력하세요."
            />
            <button onClick={handleEnter} disabled={!inputMessage}>
              send
            </button>
          </div>
          <div className={styles.chatFooterTemp}>
            {isListening ? (
              <img
                src={microphone}
                alt="..."
                style={{ width: "80px", height: "80px", margin: "10px" }}
              />
            ) : (
              <p className="pt-5 pb-11" >스페이스를 눌러 음성채팅을 이용해보세요</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(ChatRoom);
