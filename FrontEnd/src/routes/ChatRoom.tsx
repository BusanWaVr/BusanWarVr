import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { useEffect } from "react";

let sockJS = new SockJS("http://13.209.65.4/ws-stomp");
let stompClient = Stomp.over(sockJS);

export type message = {
  username: string;
  content: string;
};

function ChatRoom() {
  useEffect(() => {
    stompClient.connect({}, () => {
      console.log("연결됨");
      stompClient.subscribe("/sub/chat/message/room/1", (data) => {
        console.log(JSON.parse(data.body));
      });
    });
  }, []);

  const handleEnter = () => {
    const newMessage = {
      roomId: 1,
      token:
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTAzOTMzOTEsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJzb2NrZXN0MTJAdGVzdC5jb20ifQ.LRVLb35pIKQfgq-w0TKVnCqTvMZdMZJkdqY7KXLZDyY",
      message: "asdasdas",
    };
    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
  };

  const handleEnter2 = () => {
    const newMessage = {
      roomId: 1,
      token:
        "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTAzOTM5MjYsImlzcyI6InRlc3QiLCJVU0VSX05BTUUiOiJzb2NrZXN0MUB0ZXN0LmNvbSJ9.VbHWpcHAYbalzCjKxBtsSqGNPNbwHMrktl8FIEyb4N0",
      message: "하이",
    };
    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
  };

  return (
    <>
      <h1>ChatRoom 페이지입니다.</h1>
      <button onClick={handleEnter}>내가 메시지 보내기</button>
      <button onClick={handleEnter2}>상대방이 메시지 보내기</button>
    </>
  );
}

export default ChatRoom;
