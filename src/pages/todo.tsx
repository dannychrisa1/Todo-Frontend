import SideBar from "../components/SideBar";
import TodoForm from "../components/todoForm";

const Todo = () => {
    return (
        <div className="bg-gray-primary-100 dark:bg-dark-bg flex h-screen overflow-y-hidden p-4 gap-5">
            <SideBar />
            <div className="w-[100%] dark:bg-dark-bg bg-white relative lg:left-[22%] lg:w-[79%] rounded-2xl p-4
             h-[95vh] overflow-y-scroll scrollbar-none lg:px-4 lg:scrollbar-thin lg:scrollbar-thumb-gray-300 lg:scrollbar-track-gray-600">
                <TodoForm />
            </div>
        </div>
    )
}

export default Todo