import { RootState } from "@/store";

export const selectFilteredTodos = (state: RootState) => {
  const { items, filter } = state.todos;

  if (filter === "All") return items;
  return items.filter((t) => t.status === filter);
};
