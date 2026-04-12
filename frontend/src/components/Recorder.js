import { useState, useRef } from "react";
import { sendAudio } from "../services/api.js";

function Recorder({ onResult }) {

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm"
    });

    recorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    recorder.start();

    mediaRecorderRef.current = recorder;
    setRecording(true);
  };
const stopRecording = () => {

  mediaRecorderRef.current.stop();
  setRecording(false);

  mediaRecorderRef.current.onstop = () => {

    const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });

    audioChunks.current = [];

    if (!audioBlob || audioBlob.size === 0) {
      alert("Recording failed. Please try again.");
      return;
    }

    console.log("Blob:", audioBlob);

    // 🔥 send ONLY blob
    onResult(audioBlob);
  };
};
  return (
    <div style={{ marginTop: "40px" }}>

      {!recording && (
        <button onClick={startRecording} style={{ padding: "15px 25px" }}>
          Start Recording
        </button>
      )}

      {recording && (
        <button onClick={stopRecording} style={{ padding: "15px 25px" }}>
          Stop Recording
        </button>
      )}

    </div>
  );
}

export default Recorder;