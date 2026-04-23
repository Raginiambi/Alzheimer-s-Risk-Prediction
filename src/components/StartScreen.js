function StartScreen({ startTest }) {

  return (

    <div className="screen">

      <h2 className="screenTitle">
        Welcome to the Cognitive Screening Test
      </h2>

      <p className="screenText">
        Answer three short questions verbally for speech pattern analysis
      </p>

      <button
        className="primaryBtn"
        onClick={startTest}
      >
        Start Screening
      </button>

    </div>

  );

}

export default StartScreen;