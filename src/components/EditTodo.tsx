import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllTodos, updateTodo } from '../slices/todo/todoSlice';
import { toast } from 'react-toastify';

const EditTodoItem = () => {

    const { todoUuid } = useParams<{ todoUuid: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { todos } = useAppSelector((state) => state.todo);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const todo = todos.find((todo) => todo.uuid === todoUuid);
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setDueDate(todo.dueDate);
        }
    }, [todoUuid, todos]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await dispatch(updateTodo({ todoUuid: todoUuid!, todoData: { title, description, dueDate } })).unwrap();
            console.log("Update Todo Response:", result);
            toast.success('Todo updated successfully');
            await dispatch(getAllTodos());
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to update todo');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Update Todo
                </button>
            </form>
        </div>
    );
};

export default EditTodoItem;