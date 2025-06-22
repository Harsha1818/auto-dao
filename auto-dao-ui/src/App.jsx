import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({});
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingProposals, setFetchingProposals] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const endpoints = ["tokenomics", "governance", "voting"];
    const newResults = {};

    for (const endpoint of endpoints) {
      try {
        const res = await axios.post(`http://localhost:3001/${endpoint}`, { input });
        newResults[endpoint] = res.data.proposal || res.data.result;
      } catch (err) {
        newResults[endpoint] = `❌ Failed to fetch ${endpoint}`;
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  const fetchProposals = async () => {
    setFetchingProposals(true);
    try {
      const res = await axios.get("http://localhost:3001/proposals");
      setProposals(res.data.proposals || []);
    } catch (err) {
      setProposals(["❌ Failed to fetch proposals"]);
    }
    setFetchingProposals(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🧠 AutoDAO Engineer</h1>

      <textarea
        rows={4}
        cols={80}
        placeholder="Describe your ideal DAO..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", fontSize: "1rem" }}
      />

      <br />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: "0.5rem 1rem", fontSize: "1rem", marginRight: "1rem", cursor: "pointer" }}
      >
        {loading ? "Generating..." : "Generate DAO Design"}
      </button>

      <button
        onClick={fetchProposals}
        disabled={fetchingProposals}
        style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}
      >
        {fetchingProposals ? "Loading Proposals..." : "📜 View On-Chain Proposals"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        {Object.entries(results).map(([section, content]) => (
          <div key={section} style={{ marginBottom: "2rem" }}>
            <h3>{section.toUpperCase()}</h3>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                background: "#f5f5f5",
                padding: "1rem",
                borderRadius: "8px"
              }}
            >
              {content}
            </pre>
          </div>
        ))}

        {proposals.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2>📦 On-Chain Proposals</h2>
            <ol>
              {proposals.map((p, idx) => (
                <li key={idx} style={{ marginBottom: "1rem" }}>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      background: "#eef",
                      padding: "1rem",
                      borderRadius: "6px"
                    }}
                  >
                    {p}
                  </pre>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
