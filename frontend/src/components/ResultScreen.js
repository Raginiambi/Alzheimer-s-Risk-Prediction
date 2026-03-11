import Visualization from "./Visualization";

function ResultScreen({results}) {

  if (!results || results.length === 0) {
  return <p>Processing results...</p>;
}

const finalPrediction = results[results.length - 1];

  return (
    <div style={{textAlign:"center", marginTop:"60px"}}>

      <h2>Screening Result</h2>

      <h3>
        Prediction: {finalPrediction.prediction}
      </h3>

      <p>
        Confidence: {finalPrediction.confidence.toFixed(2)}%
      </p>

      <div style={{marginTop:"40px"}}>
        <h3>Transcript</h3>

        {results.map((r,index)=>(
          <p key={index}>{r.transcript}</p>
        ))}
      </div>

      <Visualization features={finalPrediction.features} />

    </div>
  );
}

export default ResultScreen;