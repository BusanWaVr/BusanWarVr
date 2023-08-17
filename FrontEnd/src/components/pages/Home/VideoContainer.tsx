import React, { useState, useEffect } from "react";
import videoBackground from "../../../assets/main_background.mp4";
import styles from "./VideoContainer.module.css";

function VideoContainer() {
  return (
    <div className="main">
      <video
        src={videoBackground}
        autoPlay
        loop
        muted
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "calc(100vh - 4rem)",
        }}
      />
      <div className={styles.iconScroll}></div>
    </div>
  );
}

export default VideoContainer;
