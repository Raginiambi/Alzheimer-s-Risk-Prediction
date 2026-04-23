import { useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

import questions from "./questions";
import { sendAudio } from "./services/api";

import "./theme.css";

function App() {

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const startTest = () => {
    setStarted(true);
  };

  const handleAnswer = async (audioBlob) => {

    const response = await sendAudio(audioBlob);

    if (response.error) {
      alert(response.error);
      return;
    }

    const updated = [...answers, response];
    setAnswers(updated);

    const next = currentQuestion + 1;

    if (next < questions.length) {

      setCurrentQuestion(next);

    } else {

      const combinedText = updated
        .map(r => r.transcript)
        .join(" ");

      console.log("Final Transcript:", combinedText);

      const finalRes = await axios.post(
        "http://127.0.0.1:5000/final_predict",
        { transcript: combinedText }
      );

      setResult(finalRes.data);
      setCurrentQuestion(next);
    }
  };

  return (

    <div className="app">

      <div className="bg">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
      </div>

      <Header />

      {!started && (
        <StartScreen startTest={startTest} />
      )}

      {started && currentQuestion < questions.length && (
        <QuestionScreen
          questionNumber={currentQuestion + 1}
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      )}

      {started && currentQuestion >= questions.length && result && (
        <ResultScreen result={result} />
      )}

    </div>

  );
}

export default App;