import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";

let sockJS = new SockJS("http://13.209.65.4/ws-stomp");
let stompClient = Stomp.over(sockJS);

export type message = {
  username: string;
  content: string;
};

function ChatRoom() {
  const [chatMessages, setChatMessages] = useState<message[]>([]); // Initialize chat messages state
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
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
  }, []);

  const handleEnter = () => {
    const newMessage = {
      roomId: 1,
      token:
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTAzOTMzOTEsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJzb2NrZXN0MTJAdGVzdC5jb20ifQ.LRVLb35pIKQfgq-w0TKVnCqTvMZdMZJkdqY7KXLZDyY",
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
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTAzOTM5MjYsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJzb2NrZXN0MUB0ZXN0LmNvbSJ9.VbHWpcHAYbalzCjKxBtsSqGNPNbwHMrktl8FIEyb4N0",
      message: "하이",
    };
    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
    console.log(chatMessages);
  };

  return (
    <>
      <h1>ChatRoom 페이지입니다.</h1>
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
      />
      <button onClick={handleEnter}>send</button>
      <br />
      <button onClick={handleEnter2}>상대방이 메시지 보내기 test</button>
    </>
  );
}

export default ChatRoom;
