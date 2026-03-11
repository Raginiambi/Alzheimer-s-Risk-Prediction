import { useState, useRef } from "react";
import { sendAudio } from "../services/api.js";

function Recorder({onResult}) {

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({audio:true});

    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    recorder.start();

    mediaRecorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = async () => {

    mediaRecorderRef.current.stop();
    setRecording(false);

    mediaRecorderRef.current.onstop = async () => {

      const audioBlob = new Blob(audioChunks.current, {type:"audio/wav"});
      audioChunks.current = [];

      const result = await sendAudio(audioBlob);

      onResult(result);
    };
  };

  return (

    <div style={{marginTop:"40px"}}>

      {!recording && (
        <button onClick={startRecording} style={{padding:"15px 25px"}}>
          Start Recording
        </button>
      )}

      {recording && (
        <button onClick={stopRecording} style={{padding:"15px 25px"}}>
          Stop Recording
        </button>
      )}

    </div>
  );
}

export default Recorder;