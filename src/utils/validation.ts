// Example validation utilities
import type { TaskFormData } from "../types/task";

export function validateTask(data: TaskFormData) {
  if (!data.title || data.title.trim() === "") {
    return "Title is required.";
  }
  // Add more rules as needed
  return null;
}
