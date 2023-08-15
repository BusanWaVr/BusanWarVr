import { object } from "prop-types";
import UserVideoComponent from "./UserVideoComponent";
import styled from "styled-components";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const ScrollList = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserVideoContainer = ({
  publisher,
  subscribers,
  handleMainVideoStream,
}) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <ScrollList className="flex gap-6 h-full p-6" {...events} ref={ref}>
      {/* 현재 유저 화면 */}
      {publisher !== undefined ? (
        <div
          style={{ height: "100%" }}
          className="stream-container current-stream"
          onClick={() => handleMainVideoStream(publisher)}
        >
          <UserVideoComponent streamManager={publisher} />
        </div>
      ) : null}
      {/* 다른 유저 화면 */}
      {subscribers.map((sub, i) => (
        <div
          key={sub.id}
          className="stream-container"
          onClick={() => handleMainVideoStream(sub)}
        >
          <span>{sub.id}</span>
          <UserVideoComponent streamManager={sub} />
        </div>
      ))}
    </ScrollList>
  );
};

export default UserVideoContainer;
