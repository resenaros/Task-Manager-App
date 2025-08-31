import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import type { Task } from "../types/task";

export const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask } = useTaskContext();
  const navigate = useNavigate();

  const task: Task | undefined = tasks.find((t: Task) => t.id === id);

  if (!task) return <div>Task not found</div>;

  const handleComplete = (): void => {
    updateTask({ ...task, completed: true });
    navigate("/tasks");
  };

  return (
    <div>
      <h2>Details</h2>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate || "None"}</p>
      <p>Status: {task.completed ? "Completed" : "Active"}</p>
      {!task.completed && (
        <button onClick={handleComplete}>Mark Complete</button>
      )}
      <button onClick={() => navigate("/tasks")}>Back to List</button>
    </div>
  );
};
export default TaskDetails;
