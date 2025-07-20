import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goals, onUpdate, onDelete }) {
  return (
    <div>
      <h2>All Goals</h2>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default GoalList;
