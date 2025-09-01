import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";
import type { Task } from "../types/task";

const TaskDashboard: React.FC = () => {
  const { tasks, deleteTask } = useTaskContext();
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteTask(id);
    setDeleteMessage("Task deleted successfully.");
    setTimeout(() => setDeleteMessage(null), 2500);
  };

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/create" className="btn btn-primary btn-outline-dark mb-3">
        Create New Task
      </Link>
      {deleteMessage && (
        <div
          className="alert alert-success text-center"
          style={{ margin: "10px 0" }}
        >
          {deleteMessage}
        </div>
      )}
      {tasks.length === 0 ? (
        <div
          className="text-center mt-3"
          style={{ fontSize: "1.2rem", color: "#ffffffff" }}
        >
          No tasks found.
        </div>
      ) : (
        <ul className="list-unstyled text-center">
          {tasks.map((task: Task) => (
            <li key={task.id} className="mb-2">
              <div>
                <Link to={`/task/${task.id}`} className="btn btn-info btn-outline-dark me-2">
                  View Details
                </Link>
                <Link to={`/edit/${task.id}`} className="btn btn-warning btn-outline-dark me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-outline-dark"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
              <div className="text-white fs-5 m-2">
                <span>{task.title}</span>
                {task.completed ? " (Done)" : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskDashboard;
