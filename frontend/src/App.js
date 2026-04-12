// import { useState } from "react";

// import Header from "./components/Header";
// import StartScreen from "./components/StartScreen";
// import QuestionScreen from "./components/QuestionScreen";

// import questions from "./questions";
// import ResultScreen from "./components/ResultScreen";

// function App() {

//   const [started,setStarted] = useState(false);
//   const [currentQuestion,setCurrentQuestion] = useState(0);
//   const [answers,setAnswers] = useState([]);

//   const startTest = () => {
//     setStarted(true);
//   };

//  const handleAnswer = (result) => {

//   const updatedAnswers = [...answers, result];

//   setAnswers(updatedAnswers);

//   const next = currentQuestion + 1;

//   setCurrentQuestion(next);
// };

//   return (

//     <div>

//       <Header />

//       {!started && <StartScreen startTest={startTest} />}

//       {started && currentQuestion < questions.length && (
//         <QuestionScreen
//           questionNumber={currentQuestion+1}
//           question={questions[currentQuestion]}
//           onAnswer={handleAnswer}
//         />
//       )}
//       {started && currentQuestion >= questions.length && (
//   <ResultScreen results={answers} />
// )}

//     </div>
//   );
// }

// export default App;


import { useState } from "react";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

import questions from "./questions";

// 🔥 IMPORT THIS (missing earlier)
import { sendAudio } from "./services/api";

function App() {

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);  // 🔥 ADD THIS

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

    // 🔥 COMBINE TRANSCRIPTS
    const combinedText = updated
      .map(r => r.transcript)
      .join(" ");

    console.log("Final Transcript:", combinedText);

    // 🔥 CALL FINAL PREDICTION API
    const finalRes = await axios.post(
      "http://127.0.0.1:5000/final_predict",
      { transcript: combinedText }
    );

    setResult(finalRes.data);
    setCurrentQuestion(next);
  }
};
  return (
    <div>

      <Header />

      {!started && <StartScreen startTest={startTest} />}

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