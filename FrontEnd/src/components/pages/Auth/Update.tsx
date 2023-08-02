import React, { useState } from "react";
import axios from "axios";
import GeneralUpdate from "./GeneralUpdate";
import GuideUpdate from "./GuideUpdate";

const Update = () => {
  return (
    <div>
      <h1>업데이트페이지</h1>
      {localStorage.getItem("userType") === "GUIDE" ? (
        <GuideUpdate />
      ) : (
        <GeneralUpdate />
      )}
    </div>
  );
};

export default Update;
