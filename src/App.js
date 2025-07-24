import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then(res => res.json())
      .then(setGoals);
  }, []);

  const addGoal = (goal) =>
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    })
      .then(res => res.json())
      .then(data => setGoals(prev => [...prev, data]));

  const updateGoal = (id, fields) =>
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    })
      .then(res => res.json())
      .then(updated =>
        setGoals(prev => prev.map(g => (g.id === id ? updated : g)))
      );

  const deleteGoal = (id) =>
    fetch(`http://localhost:3000/goals/${id}`, { method: "DELETE" })
      .then(() => setGoals(prev => prev.filter(g => g.id !== id)));

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <GoalForm onAddGoal={addGoal} />
      <Overview goals={goals} />
      <GoalList goals={goals} onUpdate={updateGoal} onDelete={deleteGoal} />
    </div>
  );
}

export default App;
