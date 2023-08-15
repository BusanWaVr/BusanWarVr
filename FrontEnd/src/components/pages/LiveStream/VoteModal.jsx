import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components"


const VoteContainer = styled.div`
    width: 530px;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 300px;
    background-color: rgba( 0, 0, 0, 0.7 );
    border-radius: 30px;
    padding: 10px;
    color: #ffffff;

  `

const VoteModal = (props) => {
  const {
    option1,
    option2,
    option1Cnt,
    option2Cnt,
    isVoteOpen,
  } = useSelector((state) => state.liveStream);

  return (
    <div>
      {isVoteOpen?
      <VoteContainer>
        <div>
          {props.voting ? <p>현재 진행중인 투표입니다.</p> : <p>투표가 종료되었습니다.</p>}
          
          <p>{option1}: {option1Cnt}</p>
          <p>{option2}: {option2Cnt}</p>
        </div>
      </VoteContainer> : <></>}
    </div>
    
  );
};

export default VoteModal;