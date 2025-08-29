import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTask } = useTaskContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert("Title required");
      return;
    }
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};
export default TaskForm;
