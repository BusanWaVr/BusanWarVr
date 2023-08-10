import React, { useEffect, useRef, useState } from "react";
import TestVoice from "./TestVoice";
import oneAudio from "../../../assets/vote1.mp3";
import twoAudio from "../../../assets/vote2.mp3";

function TestTest(){
    const [selectOneAudio] = useState(new Audio(oneAudio));
    const [selectTwoAudio] = useState(new Audio(twoAudio));
    const [playSoundOne, setPlaySoundOne] = useState(0);
    const isLooping = useRef(true);

    useEffect(() => {
        // 1번 선택
        if (playSoundOne == 1) {
            selectOneAudio.play()
            handleDisable();
        }
        // 2번 선택
        else if(playSoundOne == 2){
            selectTwoAudio.play()
            handleDisable();
        }
    }, [playSoundOne]);

    const URL = "https://teachablemachine.withgoogle.com/models/MV3Q-eenM/";
    let model, webcam, ctx, labelContainer, maxPredictions;

    async function init() {
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
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop(timestamp) {
        if (!isLooping.current){
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

        if(caseOne == "1.00"){
            setPlaySoundOne(1);
        }
        else if(caseTwo == "1.00"){
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

    function handleDisable(){
        setPlaySoundOne(false);
        isLooping.current = false;
    }

    return (
        <div>
            <div>Teachable Machine Pose Model</div>
                <button type="button" onClick={init}>Start</button>
            <div>
            <canvas id="canvas"></canvas>
            </div>
            <div id="label-container"></div>
        </div>
    )
}

export default TestTest;