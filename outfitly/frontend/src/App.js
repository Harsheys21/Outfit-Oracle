import React, { useState } from "react";

function App() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:5050/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: inputData }),
    });
    const responseData = await result.json();
    setResponse(responseData.message);
    setInputData("");
  };

  return (
    <div>
      <h1>Simple Web App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter something..."
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
