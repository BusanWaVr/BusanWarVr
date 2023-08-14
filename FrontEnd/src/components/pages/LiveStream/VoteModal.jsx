import React from 'react';
import { useSelector, useDispatch } from "react-redux";
// import {
//   setIsAudioEnabled,
//   setIsVideoEnabled,
//   setIsFullScreen,
//   setIsChatOpen,
//   setStompClient,
//   setOption1,
//   setOption2,
//   setOption1Cnt,
//   setOption2Cnt,
// } from "./LiveStreamReducer";

const VoteModal = () => {
  const {
    option1,
    option2,
    option1Cnt,
    option2Cnt,
  } = useSelector((state) => state.liveStream);
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>투표 현황</h2>
        <p>{option1}: {option1Cnt}</p>
        <p>{option2}: {option2Cnt}</p>
        {/* <button onClick={onClose}>닫기</button> */}
      </div>
    </div>
  );
};

export default VoteModal;