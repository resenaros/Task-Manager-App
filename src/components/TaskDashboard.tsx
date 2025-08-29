import React from "react";
import { useTaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";

export const TaskDashboard: React.FC = () => {
  const { tasks, deleteTask } = useTaskContext();

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/create">
        <button>Create New Task</button>
      </Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/task/${task.id}`}>{task.title}</Link>{" "}
            {task.completed ? "(Done)" : ""}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskDashboard;
