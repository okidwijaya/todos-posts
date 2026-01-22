import { Todo } from "@/features/todos/todosTypes";

const KEY = "todos";

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(KEY, JSON.stringify(todos));
};

export const loadTodos = (): Todo[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};
