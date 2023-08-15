import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const VoteModal = (props) => {
  const { option1, option2, option1Cnt, option2Cnt, isVoteOpen } = useSelector(
    (state) => state.liveStream
  );

  return (
    <div>
      {isVoteOpen ? (
        <div className="mx-12 bg-zinc-900 p-6">
          <div className="mb-5 font-bold">
            {props.voting ? (
              <p>현재 진행중인 투표입니다.</p>
            ) : (
              <p>투표가 종료되었습니다.</p>
            )}
          </div>

          <p>
            {option1}: {option1Cnt}
          </p>
          <p>
            {option2}: {option2Cnt}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VoteModal;
