import "./LiveExaple.css";
import YouTube, { YouTubeProps } from "react-youtube";

function LiveExample() {
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
      <div className="youtube-header"></div>
      <div className="youtube-container">
        <YouTube
          videoId="hH7V-YFZbbs"
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
    </>
  );
}

export default LiveExample;
