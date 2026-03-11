import { useState } from "react";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";

import questions from "./questions";
import ResultScreen from "./components/ResultScreen";

function App() {

  const [started,setStarted] = useState(false);
  const [currentQuestion,setCurrentQuestion] = useState(0);
  const [answers,setAnswers] = useState([]);

  const startTest = () => {
    setStarted(true);
  };

 const handleAnswer = (result) => {

  const updatedAnswers = [...answers, result];

  setAnswers(updatedAnswers);

  const next = currentQuestion + 1;

  setCurrentQuestion(next);
};

  return (

    <div>

      <Header />

      {!started && <StartScreen startTest={startTest} />}

      {started && currentQuestion < questions.length && (
        <QuestionScreen
          questionNumber={currentQuestion+1}
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      )}
      {started && currentQuestion >= questions.length && (
  <ResultScreen results={answers} />
)}

    </div>
  );
}

export default App;