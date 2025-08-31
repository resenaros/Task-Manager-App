import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/task";

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const addTask = (task: Task): void => setTasks([...tasks, task]);
  const updateTask = (updated: Task): void =>
    setTasks(tasks.map((t: Task) => (t.id === updated.id ? updated : t)));
  const deleteTask = (id: string): void =>
    setTasks(tasks.filter((t: Task) => t.id !== id));
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
