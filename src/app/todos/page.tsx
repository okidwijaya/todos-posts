"use client";
import { useState } from "react";
import Link from "next/link";
import BubleItemFilter from "@/component/Filter/buble";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    addTodo,
    setFilter,
    updateStatus,
    deleteTodo,
} from "@/features/todos/todosSlice";
import { selectFilteredTodos } from "@/features/todos/todosSelectors";

export default function TodosPage() {
    const dispatch = useAppDispatch();

    const todos = useAppSelector(selectFilteredTodos);
    const activeFilter = useAppSelector(state => state.todos.filter);

    const [showAddTask, setShowAddTask] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitTodo = () => {
        if (!title.trim()) return;

        dispatch(addTodo({ title, description }));
        setTitle("");
        setDescription("");
        setShowAddTask(false);
    };

    return (
        <div className="w-full bg-[#FFFFFF] min-h-screen relative">
            <div className="bg-[#121212] w-full flex justify-between items-center py-4 px-6">
                <Link href="/" className="text-white">YVENTURES</Link>
                <Link href="/" className="text-white font-semibold">Posts</Link>
            </div>

            <div className="w-full px-4 py-2 max-w-6xl mx-auto">
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex gap-2">
                        {["All", "Pending", "Active", "Completed"].map(f => (
                            <BubleItemFilter
                                key={f}
                                isActive={activeFilter === f}
                                filter={f}
                                fn={(v: any) => dispatch(setFilter(v))}
                            />
                        ))}
                    </div>

                    <button
                        className="rounded-md bg-[#121212] text-white p-2 uppercase font-semibold"
                        onClick={() => setShowAddTask(true)}
                    >
                        Add
                    </button>
                </div>

                <div className="mt-4 space-y-3">
                    {todos.length === 0 && (
                        <p className="text-center text-gray-400">No todos</p>
                    )}

                    {todos.map(todo => (
                        <div
                            key={todo.id}
                            className="border rounded-md p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">{todo.title}</h3>
                                <p className="text-sm text-gray-500">{todo.description}</p>
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={todo.status}
                                    onChange={e =>
                                        dispatch(
                                            updateStatus({
                                                id: todo.id,
                                                status: e.target.value as any,
                                            })
                                        )
                                    }
                                >
                                    <option>Pending</option>
                                    <option>Active</option>
                                    <option>Completed</option>
                                </select>

                                <button
                                    className="text-red-500"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showAddTask && (
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-white max-w-md w-full p-4 rounded-md">
                        <input
                            className="w-full border p-2 mb-2"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea
                            rows={6}
                            className="w-full border p-2"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <div className="flex gap-2 mt-4">
                            <button
                                className="bg-red-500 text-white w-full p-2"
                                onClick={() => setShowAddTask(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-black text-white w-full p-2"
                                onClick={submitTodo}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
