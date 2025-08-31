import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { validateTask } from "../utils/validation";
import type { TaskFormData, Task } from "../types/task";

type TaskFormProps = {
  initialData?: TaskFormData;
};

export const TaskForm: React.FC<TaskFormProps> = ({ initialData }) => {
  const { id } = useParams<{ id?: string }>();
  const { tasks, addTask, updateTask } = useTaskContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<TaskFormData>(
    initialData ?? {
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    }
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const task: Task | undefined = tasks.find((t: Task) => t.id === id);
      if (task) {
        setForm({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate || "",
          completed: task.completed,
        });
      }
    }
  }, [id, tasks]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError: string | null = validateTask(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (id) {
      updateTask({ id, ...form, createdAt: new Date().toISOString() });
    } else {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        ...form,
        createdAt: new Date().toISOString(),
      };
      addTask(newTask);
    }
    navigate("/tasks");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />
      <label>
        Completed:
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{id ? "Update" : "Save"}</button>
    </form>
  );
};

export default TaskForm;
