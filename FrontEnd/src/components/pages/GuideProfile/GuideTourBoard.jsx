import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import GuideTourNavbar from "./GuideTourNavbar";

function GuideTourBoard() {
  const { urlId } = useParams();
  const { isMe } = useOutletContext;

  return (
    <div>
      <h1>가이드 투어 보드</h1>
      <GuideTourNavbar />
      <Outlet context={{ isMe }} />
    </div>
  );
}

export default GuideTourBoard;
