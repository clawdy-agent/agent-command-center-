import React, { useState, useEffect } from 'react';

export default function RuleEditor() {
  const [rules, setRules] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/rules/clawdy').then(r => r.json()).then(d => setRules(d.rules || []));
  }, []);

  const add = async () => {
    await fetch('http://localhost:3001/api/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_id: 'clawdy', rule_name: name, rule_value: value })
    });
    setRules([...rules, { rule_name: name, rule_value: value }]);
    setName(''); setValue('');
  };

  return (
    <div className="panel">
      <h2>⚙️ Rule Editor</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={add}>Add Rule</button>
      {rules.map((r, i) => <div key={i} className="rule-item"><span>{r.rule_name}</span><span>{r.rule_value}</span></div>)}
    </div>
  );
}
