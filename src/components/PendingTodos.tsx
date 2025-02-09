import { useAppSelector } from "../hooks";
import Button from "./Button";
import LoaderIcon from "../assets/loader.svg"

const PendingTodos = () => {
    const { todos, isLoading, isError, message } = useAppSelector((state) => state.todo)
    const PendingTodos = todos.filter(todo => todo.status === false);

    return (
        <div>
            <table className="table-auto text-left w-full border-collapse hidden md:table ">
                <thead className="">
                    <tr>
                        <th className="text-gray-960 font-medium text-sm py-3 px-8">Title</th>
                        <th className="text-gray-960 font-medium text-sm py-3 px-8 w-[25%]">Description</th>
                        <th className="text-gray-960 font-medium text-sm py-3 px-8">Status</th>
                        <th className="text-gray-960 font-medium text-sm py-3 px-8">Due Date</th>
                    </tr>
                </thead>
                {isLoading ? (
                    <div className="flex items-center justify-center gap-4 h-[60vh]">
                        <img
                            src={LoaderIcon}
                            alt="loader"
                            width={24}
                            height={24}
                            className="animate-spin"
                        />
                        Loading ...
                    </div>
                ) : isError ? (
                    <p className="text-red-500">{message}</p>
                ) : (
                    <tbody className="border dark:border-gray-primary-800 border-gray-primary-900">
                        {PendingTodos && PendingTodos.length > 0 ?
                            (
                                PendingTodos.map((todo) => todo?.uuid ? (
                                    <tr key={todo?.uuid} className="shadow-custom-inset">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-black-950">{todo?.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-7 w-[25%]">
                                            <span className="text-sm text-black-950">{todo?.description}</span>
                                        </td>
                                        <td className="py-3 px-5">
                                            <span className={`text-sm px-4 py-1 rounded-full ${todo?.status ? "bg-green-300 text-green-700" : "bg-yellow-300 text-yellow-600"
                                                }`}>
                                                {todo?.status ? "Completed" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-8">
                                            <span className="text-sm text-black-950">{todo?.dueDate}</span>
                                        </td>

                                    </tr>
                                ) : null)

                            ) : (
                                <p className="text-gray-400">No todos available</p>
                            )
                        }
                    </tbody>
                )}

            </table>
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center gap-4 h-[60vh]">
                        <img
                            src={LoaderIcon}
                            alt="loader"
                            width={24}
                            height={24}
                            className="animate-spin"
                        />
                        Loading ...
                    </div>
                ) : isError ? (
                    <p className="text-red-500">{message}</p>
                ) : (
                    <div className="border border-gray-600 p-4 rounded-lg shadow">
                        {PendingTodos && PendingTodos.length > 0 ? (
                            PendingTodos.map((todo) =>
                                todo?.uuid ? (
                                    <div key={todo.uuid} className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Title:</span>
                                            <span className="text-black-950">{todo.title}</span>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="font-semibold">Description:</span>
                                            <span className="text-black-950">{todo.description}</span>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="font-semibold">Status:</span>
                                            <span
                                                className={`px-4 py-1 rounded-full ${todo.status ? "bg-green-300 text-green-600" : "bg-yellow-300 text-yellow-600"
                                                    }`}
                                            >
                                                {todo.status ? "Completed" : "Pending"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="font-semibold">Due Date:</span>
                                            <span className="text-black-950">{todo.dueDate}</span>
                                        </div>
                                        <div className="flex justify-between mt-4 space-x-2">
                                            <Button
                                                type="button"
                                                className="custom-green-bg px-2 py-2 rounded-lg text-sm text-white w-1/3"
                                            >
                                                Complete
                                            </Button>
                                            <Button
                                                type="button"
                                                className="custom-bg px-2 py-2 rounded-lg text-sm text-white w-1/3"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                className="custom-red-bg px-2 py-2 rounded-lg text-sm text-white w-1/3"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ) : null
                            )
                        ) : (
                            <p className="text-gray-500">No todos found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PendingTodos;