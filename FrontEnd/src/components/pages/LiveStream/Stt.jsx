import React, { useEffect, useState } from "react";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsListening } from "./LiveStreamReducer";

function Stt(props) {
  const dispatch = useDispatch();

  const stompClient = props.stompClient;

  const { isListening } = useSelector((state) => state.liveStream);
  const { accessToken } = useSelector((state) => state.userInfo);
  const tourUID = props.tourUID;

  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    if (recognizedText) {
      const voiceMessage = {
        roomUid: tourUID,
        token: accessToken,
        message: recognizedText,
      };

      stompClient.send(
        "/pub/chat/message/normal",
        {},
        JSON.stringify(voiceMessage)
      );
      console.log("음성채팅으로 보냄", voiceMessage);
    }
  }, [recognizedText]);

  async function sttFromMic() {
    try {
      const SPEECH_KEY = "774cfdf7ab9f41c78b60ffb987095d34"; // API 키 가져오기
      const SPEECH_REGION = "koreacentral"; // 리전 가져오기

      const speechConfig = speechsdk.SpeechConfig.fromSubscription(
        SPEECH_KEY,
        SPEECH_REGION
      );
      speechConfig.speechRecognitionLanguage = "ko-KR";

      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfig
      );

      recognizer.recognizeOnceAsync((result) => {
        if (result.reason === ResultReason.RecognizedSpeech) {
          setRecognizedText(result.text); // 인식된 텍스트 저장
        } else {
          console.error(
            "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
          );
        }

        dispatch(setIsListening(false)); // 마이크 동작 종료
      });
    } catch (error) {
      dispatch(setIsListening(false)); // 마이크 동작 종료
      console.error("Error:", error);
    }
  }

  // 스페이스바를 누를 때 마이크 동작 시작
  function handleSpaceKeyDown(event) {
    if (event.code === "Space" && !isListening) {
      console.log("마이크on");
      dispatch(setIsListening(true));
      sttFromMic();
    }
  }

  // 스페이스바를 떼면 마이크 동작 종료
  function handleSpaceKeyUp(event) {
    if (event.code === "Space") {
      console.log("마이크off");
      dispatch(setIsListening(false));
    }
  }

  // 페이지가 처음 로드될 때 이벤트 핸들러 등록
  useEffect(() => {
    document.addEventListener("keydown", handleSpaceKeyDown);
    document.addEventListener("keyup", handleSpaceKeyUp);

    return () => {
      document.removeEventListener("keydown", handleSpaceKeyDown);
      document.removeEventListener("keyup", handleSpaceKeyUp);
    };
  }, [isListening]);

  return <></>;
}

export default Stt;
