import React, { useEffect, useRef, useState } from "react";
import TestVoice from "./TestVoice";
import oneAudio from "../../../assets/vote1.mp3";
import twoAudio from "../../../assets/vote2.mp3";
import handsUp from "../../../assets/handsUp.png";
import camera from "../../../assets/camera.gif";
import styled from "styled-components"


const Container = styled.div`
width: 530px;
height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 100px;
    background-color: rgba( 0, 0, 0, 0.7 );
    border-radius: 30px;
    padding: 10px;
    color: #ffffff;

    // & span {
    //   background-color: rgba(4, 169, 135);
    //   border-radius: 5px;
    // }
  `;


function TestTest(props, ref) {
  const [selectOneAudio] = useState(new Audio(oneAudio));
  const [selectTwoAudio] = useState(new Audio(twoAudio));
  const [playSoundOne, setPlaySoundOne] = useState(0);
  const isLooping = useRef(true);

  React.useImperativeHandle(ref, () => ({
    init: init,
  }));

  useEffect(() => {
    // 1번 선택
    if (playSoundOne == 1) {
      selectOneAudio.play();
      handleDisable();
      vote(playSoundOne)
    }
    // 2번 선택
    else if (playSoundOne == 2) {
      selectTwoAudio.play();
      handleDisable();
      vote(playSoundOne)
    }
  }, [playSoundOne]);

  const URL = "https://teachablemachine.withgoogle.com/models/MV3Q-eenM/";
  let model, webcam, ctx, labelContainer, maxPredictions;

  async function init() {
    console.log("init실행");
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    isLooping.current = true;
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.style.display = "none";
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop(timestamp) {
    if (!isLooping.current) {
      return;
    }

    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    // 여기서 코딩 시작
    let caseOne = prediction[0].probability.toFixed(2);
    let caseTwo = prediction[1].probability.toFixed(2);
    let caseNormal = prediction[2].probability.toFixed(2);

    if (caseOne == "1.00") {
      setPlaySoundOne(1);
    } else if (caseTwo == "1.00") {
      setPlaySoundOne(2);
    }

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  function handleDisable() {
    setPlaySoundOne(false);
    isLooping.current = false;
  }

  // 사용자 투표하기(POST)
  async function vote(option) {
    try {
      const requestBody = {
        roomUid: props.tourUID,
        selectType: option,
      };

      const response = await fetch(
        "https://busanwavrserver.store/chat/vote",
        {
          method: "POST",
          headers: {
            Authorization: props.accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.status === 200) {
        console.log("투표 완료", response);
        // 투표중인상태 종료 -> 렌더링X
        props.setVoting(false);
      } else {
        // 에러
        console.log("에러", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {props.voting? 
      <Container>
        <img src={camera} alt="..." style={{ width: '80px', height: '80px', margin: '10px' }}/>
        <div style={{ textAlign: 'left' }}>

          <h5>투표가 시작되었습니다.
          <br />1번 선택지에 투표하려면 <span>왼손</span>,
          <br />2번 선택지에 투표하려면 <span>오른손</span>을 들어주세요.
          </h5>
        </div>

        <img src={handsUp} alt="..." style={{ width: '80px', height: '80px', margin: '10px' }}/>

      </Container> : <></>}

      
      <div>
            <canvas id="canvas"></canvas>
            </div>
            <div id="label-container"></div>
    </div>
  );
}

export default React.forwardRef(TestTest);
