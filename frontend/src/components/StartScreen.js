function StartScreen({startTest}) {

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>

      <h2>Welcome</h2>

      <p>This test will ask you 3 questions.</p>

      <button 
        onClick={startTest}
        style={{padding:"15px 30px", fontSize:"18px"}}
      >
        Start Screening
      </button>

    </div>
  );
}

export default StartScreen;