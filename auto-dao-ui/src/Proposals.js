import React, { useEffect, useState } from "react";

export default function Proposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/proposals")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProposals(data.proposals);
        }
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🗳️ DAO Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {proposals.map((p) => (
            <li key={p.id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-500">Proposal #{p.id}</p>
              <p className="mt-2">{p.content}</p>
              <p className="mt-1 text-xs text-gray-400">🧑 Submitted by: {p.creator}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
