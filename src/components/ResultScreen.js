import Visualization from "./Visualization";

function ResultScreen({ results }) {

  if (!results || results.length === 0) {
    return <p className="screenText">Processing results...</p>;
  }

  const finalPrediction = results[results.length - 1];

  return (

    <div className="screen">

      <h2 className="screenTitle">
        Screening Result
      </h2>

      <h3 className="resultText">
        Prediction: {finalPrediction.prediction}
      </h3>

      <p className="resultText">
        Confidence: {finalPrediction.confidence.toFixed(2)}%
      </p>

      <div className="transcriptBox">

        <h3 className="transcriptTitle">
          Transcript
        </h3>

        {results.map((r, index) => (
          <p key={index} className="transcriptText">
            {r.transcript}
          </p>
        ))}

      </div>

      <Visualization features={finalPrediction.features} />

    </div>

  );
}

export default ResultScreen;