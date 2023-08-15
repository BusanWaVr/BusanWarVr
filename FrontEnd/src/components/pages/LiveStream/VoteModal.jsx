import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components"


const VoteContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 300px;
    background-color: #eee;
    border-radius: 30px;
    padding: 0 10px;
  `;

const VoteModal = () => {
  const {
    option1,
    option2,
    option1Cnt,
    option2Cnt,
    isVoteOpen,
  } = useSelector((state) => state.liveStream);

  
  return (
    <div>
      {isVoteOpen? <VoteContainer>
      <div>
        <h2>투표 현황</h2>
        <p>{option1}: {option1Cnt}</p>
        <p>{option2}: {option2Cnt}</p>
        {/* <button onClick={onClose}>닫기</button> */}
      </div>
    </VoteContainer> : <></>}
    </div>
    
  );
};

export default VoteModal;