import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import styled from "styled-components";

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  const NicknameTag = styled.div`
    position: absolute;
    height: 20px;
    background: #f8f8f8;
    padding-left: 5px;
    padding-right: 5px;
    color: #3485ff;
    font-size: 12px;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    top: 0;
    left: 0;
  `;

  return (
    <>
      {streamManager !== undefined && (
        <div
          className="h-full relative"
          style={{
            borderRadius: "5px",
            overflow: "hidden",
            aspectRatio: "4/3",
          }}
        >
          <OpenViduVideoComponent streamManager={streamManager} />
          <NicknameTag>
            <p>{getNicknameTag()}</p>
          </NicknameTag>
        </div>
      )}
    </>
  );
}
