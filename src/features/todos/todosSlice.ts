import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoStatus = "Pending" | "Active" | "Completed";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
}

interface TodoState {
  items: Todo[];
  filter: "All" | TodoStatus;
}

const initialState: TodoState = {
  items: [],
  filter: "All",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(
      state,
      action: PayloadAction<{ title: string; description?: string }>
    ) {
      state.items.unshift({
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        status: "Pending",
      });
    },

    updateStatus(
      state,
      action: PayloadAction<{ id: string; status: TodoStatus }>
    ) {
      const todo = state.items.find(t => t.id === action.payload.id);
      if (todo) todo.status = action.payload.status;
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload);
    },

    setFilter(state, action: PayloadAction<TodoState["filter"]>) {
      state.filter = action.payload;
    },
  },
});

export const {
  addTodo,
  updateStatus,
  deleteTodo,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
