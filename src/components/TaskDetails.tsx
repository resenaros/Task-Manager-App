import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import type { Task } from "../types/task";

export const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask } = useTaskContext();
  const navigate = useNavigate();

  const task = tasks.find((t: Task) => t.id === id);

  if (!task) return <div>Task not found</div>;

  const handleComplete = () => {
    updateTask({ ...task, completed: true });
    navigate("/");
  };

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due: {task.dueDate || "None"}</p>
      <p>Status: {task.completed ? "Completed" : "Active"}</p>
      {!task.completed && (
        <button onClick={handleComplete}>Mark Complete</button>
      )}
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
};
export default TaskDetails;
