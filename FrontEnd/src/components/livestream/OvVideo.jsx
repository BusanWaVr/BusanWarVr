import styled from "styled-components";
import { useRef, useEffect } from "react";

const Video = styled.video`
  border-radius: 10px;
`;

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      <Video autoPlay={true} ref={videoRef} />
    </>
  );
}
