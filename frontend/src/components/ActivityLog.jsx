import React, { useState, useEffect } from 'react';

export default function ActivityLog({ ws }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/activities').then(r => r.json()).then(d => setActivities(d.activities || []));
    if (ws) ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.type === 'activity') setActivities(p => [m.data, ...p].slice(0, 100)); };
  }, [ws]);

  return (
    <div className="panel">
      <h2>📊 Activity Log</h2>
      <div className="activity-list">
        {activities.map(a => (
          <div key={a.id} className="activity-item">
            <span className="agent">{a.agent_id}</span>
            <span className="action">{a.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
