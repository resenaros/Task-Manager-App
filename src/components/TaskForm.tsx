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

  // Keep track of original createdAt for updates
  const [originalCreatedAt, setOriginalCreatedAt] = useState<string | null>(
    null
  );

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
        setOriginalCreatedAt(task.createdAt);
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

    // Always set updatedAt on update, preserve original createdAt
    if (id) {
      updateTask({
        id,
        ...form,
        createdAt: originalCreatedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        ...form,
        createdAt: new Date().toISOString(),
        updatedAt: undefined,
      };
      addTask(newTask);
    }
    navigate("/tasks");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center"
      style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
    >
      {error && (
        <div
          className="alert alert-danger w-100"
          style={{ marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}
      <div className="mb-3 w-100">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="form-control"
        />
      </div>
      <div className="mb-3 w-100">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-control"
        />
      </div>
      <div className="mb-3 w-100">
        <label
          htmlFor="dueDate"
          className="form-check-label mb-3"
          style={{ textAlign: "left", display: "block" }}
        >
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3 w-100 d-flex align-items-center">
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
          className="form-check-input"
          id="completedCheckbox"
        />
        <label htmlFor="completedCheckbox" className="form-check-label ms-2">
          Completed
        </label>
      </div>
      <button type="submit" className="btn btn-primary btn-outline-dark w-100">
        {id ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default TaskForm;
