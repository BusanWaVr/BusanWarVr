import React, { useState, useEffect } from "react";
import "./test.css";

function TestCamera(props){

    const [isDisable, setIsDisable] = useState(props.isDisable);

    useEffect(() => {
        mainInit();
    }, []);

    const camInit = (stream) => {
        var cameraView = document.getElementById("cameraview");
        cameraView.srcObject = stream;
        cameraView.play();
    }

    const camInitFailed = (error) => {
        console.log("get camera permission failed : ", error)
    }

    const mainInit = () => {
         // Check navigator media device available
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia )
        {
            // Navigator mediaDevices not supported
            alert("Media Device not supported")
            return;
        }

        navigator.mediaDevices.getUserMedia({video:true})
            .then(camInit)
            .catch(camInitFailed);
    }

    const cameraOn = () => {
        
    }

    return (
        <div>
            { isDisable ? <></> : <video id="cameraview" style={{borderRadius : "12px"}}></video>}
        </div>
    );
}

export default TestCamera;