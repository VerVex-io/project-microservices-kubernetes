
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getVisits() {
    try {
      const response = await fetch("/api/visits/count");
      if (!response.ok) throw new Error("Backend unavailable");

      const data = await response.json();
      setVisits(data.visits);
      setError("");
    } catch {
      setError("Cannot connect to the backend.");
    }
  }

  async function addVisit() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/visits");
      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      setVisits(data.visits);
    } catch {
      setError("Failed to register your visit.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getVisits();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="icon">🌐</div>

        <h1>Microservices Dashboard</h1>

        <p className="subtitle">
          Docker & Kubernetes Project
        </p>

        <div className="counter">
          <span>{visits}</span>
          <p>Total Visits</p>
        </div>

        <button onClick={addVisit} disabled={loading}>
          {loading ? "Loading..." : "Count My Visit"}
        </button>

        <button className="refresh" onClick={getVisits}>
          Refresh Counter
        </button>

        {error && <p className="error">{error}</p>}

        <p className="footer">
          React • Node.js • Redis
        </p>
      </div>
    </div>
  );
}

export default App;
