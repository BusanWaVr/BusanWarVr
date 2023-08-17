import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const VoteModal = (props) => {
  const { option1, option2, option1Cnt, option2Cnt, isVoteOpen } = useSelector(
    (state) => state.liveStream
  );

  return (
    <div className="position-fixed my-10">
  {isVoteOpen ? (
    <div className="mx-12 bg-zinc-900 p-6 rounded-md text-white">
      <div className="mb-5 font-bold">
        {props.voteType === 0 ? (
          <p>아직 진행한 투표가 없습니다.</p>
        ) : props.voteType === 1 ? (
          <h1 className="text-2xl">투표 진행중</h1>
        ) : (
          <p>투표가 종료되었습니다.</p>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          <strong>{option1}</strong> : {option1Cnt}
        </div>
        <div>
          {option2Cnt} : <strong>{option2}</strong>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )}
</div>
  );
};

export default VoteModal;
