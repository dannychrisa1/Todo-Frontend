import { useEffect, useState } from "react"
import Button from "./Button"
import { useAppDispatch, useAppSelector } from "../hooks"
import { createTodo, reset } from "../slices/todo/todoSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const TodoForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isLoading, isSuccess, message } = useAppSelector((state) => state.todo)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
    })
    const { title, description, dueDate } = formData

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isLoading) return;

        if (!title || !description || !dueDate) {
            return toast.error("provide all details")
        } else {
            const todoData = {
                title,
                description,
                dueDate
            }
            dispatch(createTodo(todoData))
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("Navigating to dashboard...");
            navigate('/dashboard')
        }
        return () => {
            dispatch(reset())
        }
    }, [isSuccess, dispatch, navigate, message])



    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="w-[600px]">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-gray-500 text-xl font-semibold">Create Todo</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="title" className="text-sm text-gray-400">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={title}
                            onChange={onChange}
                            className="px-4 py-2 bg-gray-primary-600/55 text-black dark:bg-white border border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="description" className="text-sm text-gray-400">Description</label>
                        <textarea
                            name="description"
                            placeholder="description"
                            value={description}
                            onChange={onChange}
                            className="px-4 py-2 bg-gray-primary-600/55 text-black dark:bg-white border border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="dueDate" className="text-sm text-gray-400">Due Date</label>
                        <input
                            type="text"
                            name="dueDate"
                            placeholder="due date"
                            value={dueDate}
                            onChange={onChange}
                            className="px-4 py-2 bg-gray-primary-600/55 text-black dark:bg-white border border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                        />
                    </div>
                    <Button type="submit"
                        className={`px-4 py-2 w-full text-white mt-3 mb-3 rounded-lg text-md custom-bg
                        }`}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    )
}
export default TodoForm