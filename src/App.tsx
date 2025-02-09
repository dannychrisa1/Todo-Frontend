import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Todo from "./pages/todo";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import SunIcon from "./assets/svg/SunIcon";
import MoonIcon from "./assets/svg/MoonIcon";
import EditTodo from "./pages/editTodo";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  useEffect(() => {
    const root = document.documentElement

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
        <Button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          className="absolute top-6 lg:top-5  z-20 right-24 lg:right-10 mb-8 p-1 bg-gray-200 dark:bg-dark-bg text-black dark:text-white rounded-md"
        >
          {darkMode ?
            (
              <SunIcon />
            )
            :
            (
              <MoonIcon />
            )
          }
        </Button>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-todo" element={<Todo />} />
            <Route path="/todos/edit/:todoUuid" element={<EditTodo />} />
          </Route>

        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
