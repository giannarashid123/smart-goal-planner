// src/components/Overview.js
import React from "react";

function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div style={{ marginBottom: "20px", padding: "10px", background: "#f1f1f1" }}>
      <h2>Overview</h2>
      <p>Total Saved: ${totalSaved}</p>
      <p>Total Target: ${totalTarget}</p>
      <div style={{ background: "#ddd", height: "10px", marginTop: "5px" }}>
        <div style={{ width: `${overallProgress}%`, background: "blue", height: "100%" }}></div>
      </div>
    </div>
  );
}

export default Overview;
