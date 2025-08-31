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
      <Link to="/create">
        <button>Create New Task</button>
      </Link>
      {deleteMessage && (
        <div style={{ color: "green", margin: "10px 0", textAlign: "center" }}>
          {deleteMessage}
        </div>
      )}
      {tasks.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "1.2rem",
            color: "#444",
          }}
        >
          No tasks found.
        </div>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
          {tasks.map((task: Task) => (
            <li key={task.id} style={{ margin: "0.5rem 0" }}>
              <span>
                <Link to={`/task/${task.id}`}>
                  <button>View Details</button>
                </Link>
                <Link to={`/edit/${task.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </span>
              <div>
                <span style={{ color: "blue" }}>{task.title}</span>
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
