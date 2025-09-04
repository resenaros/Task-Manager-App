// Example validation utilities
import type { TaskFormData } from "../types/task";

// Validates Task Title is inputted else returns an error message
//  All other fields can be left blank
export function validateTask(data: TaskFormData) {
  if (!data.title || data.title.trim() === "") {
    return "Title is required.";
  }
  // Add more rules as needed
  return null;
}
