import React, { useEffect, useState, useRef } from "react";
import "./ChatRoom.css";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { useSelector } from "react-redux";

export type message = {
  username: string;
  content: string;
};

function ChatRoom() {
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [stompClient, setStompClient] = useState(
    Stomp.over(new SockJS("https://busanwavrserver.store/ws-stomp"))
  );

  const { nickname, accessToken, userId } = useSelector(
    (state: any) => state.userInfo
  );

  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (stompClient != null) {
      stompClient.connect({}, () => {
        console.log("연결됨");
        stompClient.subscribe("/sub/chat/message/room/1", (data) => {
          const receivedMessage = JSON.parse(data.body);
          const newChatMessage = {
            senderId: receivedMessage.sender.userId,
            username: receivedMessage.sender.nickname,
            content: receivedMessage.message,
          };

          // 일단 넣어두기
          scrollToBottom();

          console.log(receivedMessage);

          // 다른 유저가 보낸 메시지면
          if (receivedMessage.sender.userId != userId) {
            setChatMessages((prevMessages) => [
              ...prevMessages,
              newChatMessage,
            ]);
          }
        });
      });
    }
  }, []);

  const handleEnter = () => {
    console.log("슈우웃");
    console.log(accessToken);

    // 단 넣어두기22
    scrollToBottom();

    const newMessage = {
      roomId: 1,
      token: accessToken,
      message: inputMessage,
    };

    const newChatMessage = {
      senderId: userId,
      username: nickname,
      content: inputMessage,
    };

    setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);

    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
    console.log(chatMessages);
    setInputMessage("");
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chat-card">
        <div className="chat-header">
          <div className="h2">chatroom</div>
        </div>
        <div className="chat-body" ref={messageEndRef}>
          {chatMessages.map((msg, index) =>
            msg.senderId == userId ? (
              <div key={index} className="message outgoing">
                <p>
                  <strong>{msg.username}</strong> | {msg.content}{" "}
                </p>
              </div>
            ) : (
              <div key={index} className="message incoming">
                <p>
                  <strong>{msg.username}</strong> | {msg.content}{" "}
                </p>
              </div>
            )
          )}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleEnterPress}
            placeholder="메세지를 입력하세요."
          />
          <button onClick={handleEnter}>send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
