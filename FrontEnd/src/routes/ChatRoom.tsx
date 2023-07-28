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
          setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
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
    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
    console.log(chatMessages);
    // console.log(inputMessage);
    setInputMessage("");
  };

  const handleEnter2 = () => {
    const newMessage = {
      roomId: 1,
      token:
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTA0ODM2MzEsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJzb2NrZXN0MUB0ZXN0LmNvbSJ9.fLWU0zO2CgzxypzqShRNA78_XbrcDlu_q3sBUN7HDzs",
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
      <h1 className="chat">ChatRoom</h1>
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleEnterPress}
      />
      <button onClick={handleEnter}>send</button>
      <br />
      <button onClick={handleEnter2}>상대방이 메시지 보내기 test</button>
    </div>
  );
}

export default ChatRoom;
