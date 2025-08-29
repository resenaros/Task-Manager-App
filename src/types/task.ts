export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type TaskFormData = Omit<Task, "id" | "createdAt" | "updatedAt">;
