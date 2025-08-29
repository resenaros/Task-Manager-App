import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/task";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const addTask = (task: Task) => setTasks([...tasks, task]);
  const updateTask = (updated: Task) =>
    setTasks(tasks.map((t: Task) => (t.id === updated.id ? updated : t)));
  const deleteTask = (id: string) =>
    setTasks(tasks.filter((t: Task) => t.id !== id));
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
