import Recorder from "./Recorder";

function QuestionScreen({questionNumber, question, onAnswer}) {

  return (

    <div style={{textAlign:"center", marginTop:"80px"}}>

      <h2>Question {questionNumber}</h2>

      <p style={{fontSize:"22px"}}>{question}</p>

      <Recorder onResult={onAnswer} />

    </div>
  );
}

export default QuestionScreen;