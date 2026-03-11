import axios from "axios";

const API_URL = "http://localhost:5000/analyze";

export const sendAudio = async (audioBlob) => {

  const formData = new FormData();
  formData.append("audio", audioBlob, "answer.wav");

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};