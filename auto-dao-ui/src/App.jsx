import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({});

  const handleSubmit = async () => {
    const endpoints = ["tokenomics", "governance", "voting"];
    const newResults = {};

    for (const endpoint of endpoints) {
      const res = await axios.post(`http://localhost:3001/${endpoint}`, { input });
      newResults[endpoint] = res.data;
    }

    setResults(newResults);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AutoDAO Engineer</h1>
      <textarea
        rows={4}
        cols={80}
        placeholder="Describe your ideal DAO..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Generate DAO Design</button>

      {Object.entries(results).map(([section, data]) => (
        <div key={section}>
          <h3>{section.toUpperCase()}</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;
