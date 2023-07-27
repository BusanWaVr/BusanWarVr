import React, { useEffect, useState } from "react";
import "./ChatRoom.css";

// let sockJS = new SockJS("http://52.79.93.203/ws-stomp");
// let stompClient = Stomp.over(sockJS);

export type message = {
  username: string;
  content: string;
};

interface Props {
  stompClient: any;
  onload: Boolean;
}

function ChatRoom({ stompClient, onload }: Props) {
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    console.log(stompClient);

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
  }, [stompClient]);

  const handleEnter = () => {
    const newMessage = {
      roomId: 1,
      token:
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTA0NjYwMDMsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJzb2NrZXN0MUB0ZXN0LmNvbSJ9.TrUp2_DDh6JcjxF17K8ytPYVtDIoX9DNk5DjJ2MhAFU",
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
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTA0NjYzMjEsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJzb2NrZXN0MTJAdGVzdC5jb20ifQ.8zj6yJCsFKiZFo5XJRQIOafHSfVcUUMl-v_50D4qQ9c",
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
