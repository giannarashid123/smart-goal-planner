import React from "react";

function GoalItem({ goal, onDelete }) {
  const { id, name, targetAmount, savedAmount, deadline } = goal;
  const progress = Math.min((savedAmount / targetAmount) * 100, 100);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h4>{name}</h4>
      <p>Saved: ${savedAmount} / ${targetAmount}</p>
      <p>Deadline: {deadline}</p>
      <div style={{ background: "#eee", height: "10px", marginBottom: "10px" }}>
        <div style={{ width: `${progress}%`, background: "green", height: "100%" }}></div>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default GoalItem;
