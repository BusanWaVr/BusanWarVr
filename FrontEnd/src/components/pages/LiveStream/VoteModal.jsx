import React from 'react';

const VoteModal = ({ option1, option2, column1Cnt, column2Cnt }) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>투표 현황</h2>
        <p>{option1}: {column1Cnt}</p>
        <p>{option2}: {column2Cnt}</p>
        {/* <button onClick={onClose}>닫기</button> */}
      </div>
    </div>
  );
};

export default VoteModal;