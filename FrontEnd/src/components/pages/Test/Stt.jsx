import React, { useEffect, useState } from "react";
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

function Stt() {
    const [displayText, setDisplayText] = useState('마이크가 꺼져있습니다.');
    const [isListening, setIsListening] = useState(false); // 마이크 동작 여부 상태
    const [recognizedText, setRecognizedText] = useState('');

    async function sttFromMic() {
        try {
            const SPEECH_KEY = "774cfdf7ab9f41c78b60ffb987095d34"; // API 키 가져오기
            const SPEECH_REGION = "koreacentral"; // 리전 가져오기


            const speechConfig = speechsdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
            speechConfig.speechRecognitionLanguage = 'ko-KR';

            const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
            const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

            recognizer.recognizeOnceAsync(result => {
                if (result.reason === ResultReason.RecognizedSpeech) {
                    setRecognizedText(result.text); // 인식된 텍스트 저장
                } else {
                    console.error('ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.');
                }
            
                setIsListening(false); // 마이크 동작 종료
            });
        } catch (error) {
            setIsListening(false); // 마이크 동작 종료
            console.error('Error:', error);
        }
    }

    // 스페이스바를 누를 때 마이크 동작 시작
    function handleSpaceKeyDown(event) {
        if (event.code === 'Space' && !isListening) {
            setIsListening(true);
            setDisplayText('마이크가 켜져있습니다.'); // 마이크가 켜졌을 때 메시지
            sttFromMic();
        }
    }

    // 스페이스바를 떼면 마이크 동작 종료
    function handleSpaceKeyUp(event) {
        if (event.code === 'Space') {
            setIsListening(false);
            setDisplayText('마이크가 꺼져있습니다.'); // 마이크가 꺼졌을 때 메시지
        }
    }

    // 페이지가 처음 로드될 때 이벤트 핸들러 등록
    useEffect(() => {
        document.addEventListener('keydown', handleSpaceKeyDown);
        document.addEventListener('keyup', handleSpaceKeyUp);

        return () => {
            document.removeEventListener('keydown', handleSpaceKeyDown);
            document.removeEventListener('keyup', handleSpaceKeyUp);
        };
    }, [isListening]);

    return (
        <div className="app-container">
            <h1 className="display-4 mb-3">STT 테스트입니다.</h1>

            <div className="row main-container">
                <div className="col-6 output-display rounded">
                    <div>{displayText}</div>
                    <div>인식된 텍스트 : {recognizedText}</div> {/* 인식된 텍스트 표시 */}
                </div>
            </div>
        </div>
    );
}

export default Stt;
