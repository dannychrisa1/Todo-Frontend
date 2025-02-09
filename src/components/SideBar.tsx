import { useLocation } from "react-router-dom";
import { SideBarLinks } from "../constants";
import { useState } from "react";
import Button from "./Button";
import LogoutButton from "./logout";

const SideBar = () => {
    const location = useLocation();
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)

    const toggleSidebar = () => {
        setSideBarOpen(!sideBarOpen)
    }
    return (
        <>
            <Button
                type="button"
                className="lg:hidden fixed top-5 right-10 z-50 p-2 rounded-md bg-gray-200 text-white"
                onClick={toggleSidebar}
            >
                {sideBarOpen ?
                    (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#1A1C1F"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) :
                    (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#1A1C1F"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    )
                }
            </Button>
            <div
                className={`fixed top-0 lg:top-5 z-30 left-0 lg:left-5 h-screen w-[50%] lg:w-[20%] bg-white dark:bg-dark-bg border-r dark:border-gray-primary-800 p-4 transform ${sideBarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-[20%] lg:block lg:fixed lg:h-[95vh] lg:rounded-2xl`}>
                <div className="mt-8">
                    {SideBarLinks.map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            className={`flex text-black-500/55 hover:text-black-500 hover:bg-gray-910 rounded-lg px-2 py-3 mb-4 ${location.pathname === item.url ? "custom-bg rounded-lg text-white" : ""
                                }`}
                        >
                            <div className="flex gap-2 items-center">
                                <item.icon />
                                <p className="text-sm">{item.title}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="fixed bottom-5">
                    <LogoutButton />
                </div>
            </div>
            {/* Overlay when sidebar is open */}
            {sideBarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    )
}

export default SideBar