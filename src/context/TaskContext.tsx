import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/task";

// Define context shape
interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from sessionStorage on mount
  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a task
  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  // Delete a task by id
  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  // Update a task
  const updateTask = (updated: Task) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === updated.id ? updated : task))
    );

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Hook for context
// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
