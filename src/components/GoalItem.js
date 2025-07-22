import React, { useState } from "react";

function GoalItem({ goal, onDelete, onUpdate }) {
  const { id, name, targetAmount, savedAmount, deadline } = goal;
  const [depositAmount, setDepositAmount] = useState("");

  const progress = Math.min((savedAmount / targetAmount) * 100, 100);
  const remaining = targetAmount - savedAmount;

  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  const isComplete = savedAmount >= targetAmount;
  const isOverdue = daysLeft < 0 && !isComplete;
  const isWarning = daysLeft <= 30 && daysLeft >= 0 && !isComplete;

  function handleDeposit() {
    const deposit = Number(depositAmount);
    if (deposit <= 0) return alert("Enter a valid amount");

    const updatedSaved = savedAmount + deposit;
    onUpdate(id, { savedAmount: updatedSaved });
    setDepositAmount("");
  }

  // Dynamic progress bar color
  const barColor = isComplete ? "green" : isWarning ? "orange" : "blue";

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h4>{name}</h4>
      <p>Saved: KES {savedAmount} / {targetAmount}</p>
      <p>Remaining: KES {remaining}</p>
      <p>Deadline: {deadline} ({daysLeft} days left)</p>

      <div style={{ background: "#eee", height: "10px", marginBottom: "10px" }}>
        <div
          style={{
            width: `${progress}%`,
            background: barColor,
            height: "100%",
            transition: "width 0.5s",
          }}
        />
      </div>

      {isComplete && <p style={{ color: "green" }}>✅ Goal Complete</p>}
      {isWarning && <p style={{ color: "orange" }}>⚠️ Deadline within 30 days</p>}
      {isOverdue && <p style={{ color: "red" }}>❌ Goal Overdue</p>}

      <input
        type="number"
        placeholder="Deposit amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        style={{ marginRight: "5px" }}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={() => onDelete(id)} style={{ marginLeft: "10px" }}>Delete</button>
    </div>
  );
}

export default GoalItem;
