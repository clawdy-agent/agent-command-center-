import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/activities')
      .then(res => res.json())
      .then(data => {
        setActivities(data.activities || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const handleOverride = async () => {
    const response = await fetch('http://localhost:3001/api/override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId: 'clawdy', action: 'stop' })
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="dashboard">
      <h1>⚡ Agent Command Center</h1>
      
      <div className="panel">
        <h2>Activity Log</h2>
        {loading ? <p>Loading...</p> : (
          <table>
            <tbody>
              {activities.map(a => (
                <tr key={a.id}>
                  <td>{a.agent}</td>
                  <td>{a.action}</td>
                  <td>{new Date(a.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="panel">
        <h2>Controls</h2>
        <button onClick={handleOverride} className="override-btn">
          🛑 Emergency Override
        </button>
      </div>
    </div>
  );
}

export default App;
