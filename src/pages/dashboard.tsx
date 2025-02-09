import WelcomeImage from "../assets/welcome.svg"
import { useEffect, useState } from "react";
import Button from "../components/Button";
import AllTodos from "../components/AllTodos";
import SideBar from "../components/SideBar";
import CompletedTodos from "../components/CompletedTodos";
import PendingTodos from "../components/PendingTodos";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [activeTab, setActiveTab] = useState<string>("All")

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
             // Parse the JSON string to an object
            const parsedUser = JSON.parse(storedUser); 
            setUsername(parsedUser.username);
        }
    }, []);
    const tabs = [
        { name: "All" },
        { name: "Completed" },
        { name: "Pending" }
    ];
    const renderContent = () => {
        switch (activeTab) {
            case "All":
                return <AllTodos />;
            case "Completed":
                return <CompletedTodos />;
            case "Pending":
                return <PendingTodos />;
            default:
                return null;
        }
    };
    return (
        <div className="flex bg-gray-primary-100 dark:bg-dark-bg h-screen overflow-y-hidden p-4 gap-5">
            <SideBar />
            <div className="relative bg-white dark:bg-dark-bg lg:left-[22%] lg:w-[79%] rounded-2xl p-4
             h-[95vh] overflow-y-scroll scrollbar-none lg:px-4 lg:scrollbar-thin lg:scrollbar-thumb-gray-primary-300 lg:scrollbar-track-gray-primary-600">
                <div className="custom-bg h-auto lg:h-[40vh] mt-8 rounded-3xl flex  p-8 justify-between  overflow-y-hidden overflow-x-hidden">
                    <div className="flex flex-col md:mt-10">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 lg:mb-4">Welcome {username} !</h2>
                        <p className="text-white text-sm w-[auto] lg:w-[70%] leading-5">Start organizing your tasks by creating your to-dos and stay on top of your goals!</p>
                    </div>
                    <img src={WelcomeImage} alt="welcome" className="w-[100px] md:w-[400px] lg:block" />
                </div>
                <div className="mt-8">
                    <h2 className="mb-4 text-lg font-medium">Todos</h2>
                    <div className="flex gap-4 mb-4">
                        {tabs.map((tab) => (
                            <Button
                                type="button"
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center gap-3 text-xs text-left ${activeTab === tab.name
                                    ? "bg-black-primary-500 dark:bg-white dark:text-black-primary-500 text-white px-4 py-2 rounded-full font-medium"
                                    : "dark:text-white hover:text-black"
                                    }`}
                            >
                                {tab.name}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="w-full">{renderContent()}</div>
            </div>
        </div>
    )
}

export default Dashboard