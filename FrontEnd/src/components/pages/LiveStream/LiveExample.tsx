import YouTube, { YouTubeProps } from "react-youtube";
import { styled } from "styled-components";

interface Props {
  videoId: string;
}

const YoutubeContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  padding-bottom: 10vh;

  & iframe {
    width: 100%;
    height: 120vh !important;
    transform: translateY(-10vh);
  }
`;

function LiveExample({ videoId }: Props) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.playVideo();
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (!event.data) {
      const player = event.target;
      player.playVideo();
    }
  };

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100vh",
    playerVars: {
      controls: 0,
      rel: 0,
      disablekb: 0,
      modestbranding: 1,
      playsinline: 1,
    },
  };

  return (
    <>
      <YoutubeContainer>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </YoutubeContainer>
    </>
  );
}

export default LiveExample;
