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
    updateTask({
      ...task,
      completed: true,
      updatedAt: new Date().toISOString(),
    });
    navigate("/tasks");
  };

  return (
    <div>
      <h2>Details</h2>
      <div className="mb-2">
        <strong>Title:</strong> {task.title}
      </div>
      <div className="mb-2">
        <strong>Description:</strong> {task.description}
      </div>
      <div className="mb-2">
        <strong>Due Date:</strong> {task.dueDate || "None"}
      </div>
      <div className="mb-2">
        <strong>Status:</strong> {task.completed ? "Completed" : "Active"}
      </div>
      <div className="mb-2">
        <strong>Created At:</strong>{" "}
        {task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A"}
      </div>
      <div className="mb-2">
        <strong>Updated At:</strong>{" "}
        {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "N/A"}
      </div>
      {!task.completed && (
        <button
          className="btn btn-success btn-outline-dark me-2"
          onClick={handleComplete}
        >
          Mark Complete
        </button>
      )}
      <button
        className="btn btn-primary btn-outline-dark me-2"
        onClick={() => navigate("/tasks")}
      >
        Back to List
      </button>
    </div>
  );
};

export default TaskDetails;
