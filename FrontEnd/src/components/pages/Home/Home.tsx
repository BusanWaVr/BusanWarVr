import { useState } from "react";
import axios from "axios";

import reactLogo from "../../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";
import { increment } from "./counterReducer";

const Home: React.FC = () => {
  const counter = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  async function hadlerTest(){
    const test = await axios.get(
      "https://13.209.26.92/test"
    )
    console.log(test);
    
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={hadlerTest}>
          count is {counter}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
