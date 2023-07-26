import React, { useCallback, useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./LiveStream.css";

export default function LiveStream() {
  const navigate = useNavigate();

  const [mySessionId, setMySessionId] = useState("busanVR");
  const { youtubeLink, setYouTubeLink, userName, setUserName } = useData();

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e) => {
    setUserName(e.target.value);
  }, []);

  const handleChangeYouTubeLink = useCallback((e) => {
    setYouTubeLink(e.target.value);
  }, []);

  const joinSession = (e) => {
    navigate(`/livestream/${mySessionId}`);
  };

  return (
    <div className="_container">
      <div id="join">
        <div id="join-dialog" className="jumbotron vertical-center">
          <h1> Join a video session </h1>
          <form className="form-group" onSubmit={joinSession}>
            <p>
              <label>Participant: </label>
              <input
                className="form-control"
                type="text"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
                required
              />
            </p>
            <p>
              <label> Session: </label>
              <input
                className="form-control"
                type="text"
                id="sessionId"
                value={mySessionId}
                onChange={handleChangeSessionId}
                required
              />
            </p>
            <p>
              <label> 유튜브 라이브 링크: </label>
              <input
                className="form-control"
                type="text"
                id="sessionId"
                value={youtubeLink}
                onChange={handleChangeYouTubeLink}
                required
              />
            </p>
            <p className="text-center">
              <input
                className="btn btn-lg btn-success"
                name="commit"
                type="submit"
                value="JOIN"
              />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
