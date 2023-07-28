import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";

export type message = {
  username: string;
  content: string;
};

// interface Props {
//   stompClient: any;
//   SockJS: Boolean;
// }

function ChatRoom() {
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [stompClient, setStompClient] = useState(
    
    Stomp.over(new SockJS("http://52.79.93.203/ws-stomp"))
  );

  const accessToken = localStorage.getItem("accessToken");
  const nickName = localStorage.getItem("nickname");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (stompClient != null) {
      stompClient.connect({}, () => {
        console.log("연결됨");
        stompClient.subscribe("/sub/chat/message/room/1", (data) => {
          const receivedMessage = JSON.parse(data.body);
          const newChatMessage = {
            username: receivedMessage.sender.nickname,
            content: receivedMessage.message,
          };

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
    const newMessage = {
      roomId: 1,
      token: accessToken,
      message: inputMessage,
    };

    const newChatMessage = {
      username: nickName,
      content: inputMessage,
    };

    setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
    console.log(chatMessages);
    // console.log(inputMessage);
    setInputMessage("");
  };

  const handleEnter2 = () => {
    const newMessage = {
      roomId: 1,
      token:
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTA1NDgyODUsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJmMXJzdGYxeTlAbmF2ZXIuY29tIn0.Wjsc_R96t4h9-D9xJU1i0-Pmx60XtH8kD1uMheP9DVU",
      message: "하이",
    };
    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
    console.log(chatMessages);
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
        <div className="chat-body">
          {chatMessages.map((msg, index) => (
            <div key={index} className="message incoming">
              <p>
                <strong>{msg.username}</strong> | {msg.content}{" "}
              </p>
            </div>
          ))}
          {/* <div className="message outgoing">
            <p>I have a question about your services.</p>
          </div> */}
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
      {/* <button onClick={handleEnter2}>상대방이 메시지 보내기 test</button> */}
    </div>
  );
}

export default ChatRoom;
