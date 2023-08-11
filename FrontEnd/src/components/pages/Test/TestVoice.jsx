import React, { useEffect, useState } from "react";
import oneAudio from "../../../assets/vote1.mp3";
function TestVoice(props){
    const [selectOneAudio] = useState(new Audio(oneAudio));
    const [playingOneAudio, setPlayingOneAudio] = useState(props.start);
    const toggle = () => setPlayingOneAudio(!playingOneAudio);

    useEffect(() => {
        console.log(props.start);
        playingOneAudio ? selectOneAudio.play() : selectOneAudio.pause();
    }, [playingOneAudio])

    // useEffect(() => {
    //     selectOneAudio.addEventListener('ended', () => setPlayingOneAudio(false));

    //     return () => {
    //         selectOneAudio.removeEventListener('ended', ()=> setPlayingOneAudio(false));
    //     }
    // }, []);

    return (
        <div>
            <button onClick={toggle}>{playingOneAudio ? "Pause" : "Play"}</button>
        </div>
    )
}

export default TestVoice;