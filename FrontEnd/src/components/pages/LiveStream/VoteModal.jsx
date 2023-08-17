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
          <h1 className="text-2xl">투표가 진행중입니다.</h1>
        ) : (
          <h1 className="text-2xl">투표가 종료되었습니다.</h1>
        )}
      </div>
      <div className="flex justify-between items-center px-10">
  <div>
    <strong>{option1}</strong>
    <h1 className="text-2xl font-bold" style={{ color: "#a7b1cf" }}>{option1Cnt}</h1>
  </div>
  <p>vs</p>
  <div>
    <strong>{option2}</strong>
    <h1 className="text-2xl font-bold" style={{ color: "#ff5a47" }}>{option2Cnt}</h1>
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
