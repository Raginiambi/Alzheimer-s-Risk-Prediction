import Visualization from "./Visualization";

function ResultScreen({ result }) {

//   if (!results || results.length === 0) {
//   return <p>Processing results...</p>;
// 

console.log("Result RECEIVED: ", result);
if(!result){
  return <p> No result found</p>
}


  return (
    <div style={{textAlign:"center", marginTop:"60px"}}>

      <h2>Screening Result</h2>

      <h3>
        Prediction: {result.prediction}
      </h3>

      <p>
        Confidence: {result.confidence.toFixed(2)}%
      </p>

    <div style={{ marginTop: "40px" }}>
        <h3>Extracted Features</h3>

        {result.features &&
          Object.entries(result.features).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
      </div>


      <Visualization features={result.features} />

    </div>
  );
}

export default ResultScreen;