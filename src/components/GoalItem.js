import React, { useState } from "react";

function GoalItem({ goal, onDelete, onUpdate }) {
  const { id, name, targetAmount, savedAmount, deadline } = goal;
  const [deposit, setDeposit] = useState("");
  const progress = Math.min((savedAmount / targetAmount) * 100, 100);
  const remaining = targetAmount - savedAmount;

  const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isComplete = savedAmount >= targetAmount;
  const barColor = isComplete ? "green" : daysLeft <= 30 && daysLeft >= 0 ? "orange" : "blue";

  function handleDeposit() {
    const amt = Number(deposit);
    if (amt > 0) {
      onUpdate(id, { savedAmount: savedAmount + amt });
      setDeposit("");
    } else {
      alert("Enter a valid amount");
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <h4>{name}</h4>
      <p>SAVED: {savedAmount} / {targetAmount}</p>
      <p>Remaining: {remaining}</p>
      <p>Deadline: {deadline} ({daysLeft} days)</p>
      <div style={{ background: "#eee", height: 10, margin: "10px 0" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: barColor }} />
      </div>
      {isComplete && <p style={{ color: "green" }}>✅ Complete</p>}
      {daysLeft < 0 && !isComplete && <p style={{ color: "red" }}>❌ Overdue</p>}
      {daysLeft <= 30 && daysLeft >= 0 && !isComplete && <p style={{ color: "orange" }}>⚠️ Near Deadline</p>}
      <input
        type="number"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
        placeholder="Deposit"
        style={{ marginRight: 5 }}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={() => onDelete(id)} style={{ marginLeft: 10 }}>Delete</button>
    </div>
  );
}

export default GoalItem;
