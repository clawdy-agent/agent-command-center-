import React, { useState } from 'react';

export default function OverrideControl() {
  const [busy, setBusy] = useState(false);

  const handle = async (action) => {
    setBusy(true);
    await fetch('http://localhost:3001/api/override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_id: 'clawdy', action, reason: `Manual: ${action}` })
    });
    setBusy(false);
  };

  return (
    <div className="panel override-panel">
      <h2>🛑 Controls</h2>
      <button onClick={() => handle('pause')} disabled={busy}>⏸ Pause</button>
      <button onClick={() => handle('stop')} disabled={busy}>⏹ Stop</button>
      <button onClick={() => handle('resume')} disabled={busy}>▶ Resume</button>
    </div>
  );
}
