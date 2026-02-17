import React, { useEffect, useState } from 'react';
import ActivityLog from './components/ActivityLog';
import RuleEditor from './components/RuleEditor';
import OverrideControl from './components/OverrideControl';
import './App.css';

function App() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
    setWs(socket);
    return () => socket.close();
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>⚡ Agent Command Center</h1>
        <p>Real-time autonomous agent oversight</p>
      </header>

      <div className="grid">
        <ActivityLog ws={ws} />
        <RuleEditor />
        <OverrideControl />
      </div>
    </div>
  );
}

export default App;
