import React, { useState } from "react";
import axios from "axios";
import GeneralUpdate from "./GeneralUpdate";
import GuideUpdate from "./GuideUpdate";

const Update = () => {
  return (
    <div className="flex justify-center p-8 md:px-0">
      {localStorage.getItem("userType") === "GUIDE" ? (
        <GuideUpdate />
      ) : (
        <GeneralUpdate />
      )}
    </div>
  );
};

export default Update;
