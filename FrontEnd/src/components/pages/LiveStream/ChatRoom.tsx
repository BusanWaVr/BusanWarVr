import React, { useEffect, useState, useRef } from "react";
import "./ChatRoom.css";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { useSelector, useDispatch } from "react-redux";
import { setStompClient } from "./LiveStreamReducer";

export type message = {
  username: string;
  content: string;
};

function ChatRoom(props, ref) {
  // reducer에서 데이터 가져오기
  const { tourId, tourUID, stompClient } = useSelector(
    (state) => state.liveStream
  );
  const { accessToken, userId } = useSelector((state: any) => state.userInfo);

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

  // 연결
  // useEffect(() => {
  //   if (!subscribed) {
  //     stompClient.connect({}, () => {
  //       console.log("연결됨");
  //       rnehr();
  //       setSubscribed(true);
  //     });
  //   }

  //   return () => {
  //     if (subscribed) {
  //       gowp();
  //       setSubscribed(false);
  //     }
  //   };
  // }, [subscribed]);

  useEffect(() => {
      rnehr();
  
      console.log(stompClient);
      console.log(props.onConnect)

  },[])

  // 구독하기
  const rnehr = () => {
    stompClient.subscribe(
      `/sub/chat/message/room/${tourUID}`,
      (data) => {
        console.log(data);

        console.log("--------구독으로 받아오는 메시지---------");
        const receivedMessage = JSON.parse(data.body);
        const newChatMessage = {
          msgType: receivedMessage.type,
          userType: receivedMessage.sender.type,
          senderId: receivedMessage.sender.id,
          username: receivedMessage.sender.nickname,
          content: receivedMessage.body,
        };

        
        console.log(receivedMessage);
        
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
    setStompClient(stopmClientSave);
    console.log(stompClient);
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
    console.log(chatMessages);
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
    <div className="chatroom-container">
      <div className="chat-card">
        <div className="chat-header">
          <div className="h2">chatroom</div>
        </div>
        <div className="chat-body" ref={messageEndRef}>
          {chatMessages.map((msg, index) => {
            switch (msg.msgType) {
              case "LEAVE":
                return (
                  <p className="leave" key={index}>
                    {msg.username}님이 채팅방에서 퇴장했습니다.
                  </p>
                );
              case "JOIN":
                return (
                  <p className="join" key={index}>
                    {msg.username}님이 채팅방에 입장했습니다.
                  </p>
                );
              case "VOTE":
                return (
                  <p className="vote" key={index}>
                    {msg.username}님이 {msg.content}번에 투표했습니다.
                  </p>
                );
              default:
                return (
                  <div key={index}>
                    {msg.senderId == userId ? (
                      <p className="message outgoing" key={index}>
                        {msg.content}
                      </p>
                    ) : (
                      <p className="message incoming" key={index}>
                        <strong>{msg.username}</strong> | {msg.content}
                      </p>
                    )}
                  </div>
                );
            }
          })}
        </div>
        <div className="chat-footer">
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
        <div className="chat-footer-temp">
          {/* <button onClick={handleLeaveChat}>나가기</button>
          <button onClick={handleJoinChat}>재입장</button> */}
          <button disabled>투표하기</button>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(ChatRoom);
