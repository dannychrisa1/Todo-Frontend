import axios, { AxiosError } from 'axios'
import { Todo } from "../dataTypes"

const API_URL = `${process.env.REACT_APP_BASEURL}`

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/";
        throw new Error("Authentication token is missing. Please log in again. ")
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

//handle ApiErrors 
const handleApiError = (error: AxiosError): never => {
    const errorResponse = error.response?.data as { message: string; messages?: string[] };
    const errorMessage = errorResponse?.message || "An unexpected error occurred. Please try again.";
    const errorMessages = errorResponse?.messages || [];
    // Create a new Error object
    const customError = new Error(errorMessage);
    // Attach the messages array to the error object
    (customError as any).messages = errorMessages;
    // Throw the custom error
    throw customError;
}

//Create Todo
const createTodo = async (todoData: { title: string; description: string; dueDate: string }): Promise<{ todo: Todo; message: string }> => {
    const headers = getAuthHeaders()
    try {
        const response = await axios.post(`${API_URL}/todos`, todoData, {
            headers: headers,
        });

        if (response.data) {
            // Get the current todos from localStorage
            const currentTodos = JSON.parse(localStorage.getItem("todos") || "[]");

            // Add the new todo at the start of the list
            const updatedTodos = [response.data.todo, ...currentTodos];

            // Save updated todos to localStorage
            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            return {
                todo: response.data.todo,
                message: response.data.message,
            };
        } else {
            throw new Error("No data received from the server");
        }

    } catch (error: any) {
        if (error.response) {
            // Pass the full error response to handleApiError
            throw handleApiError(error);
        } else {
            throw new Error("Failed creating Todo");
        }
    }
}

const getAllTodos = async (): Promise<{ todos: Todo[]; message: string }> => {
    const headers = getAuthHeaders()
    try {
        const response = await axios.get(`${API_URL}/todos`, {
            headers: headers,
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Pass the full error response to handleApiError
            throw handleApiError(error);
        } else {
            throw new Error("Failed Fetching Todos");
        }
    }
};

//CompleteTodo
const completeTodoStatus = async (todoUuid: string): Promise<{ updatedTodo: Todo; message: string }> => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.put(
            `${API_URL}/todos/${todoUuid}`,
            { status: true }, // Setting status: true
            { headers }
        );
        console.log("todo response", response.data.updatedTodo)

        return {
            updatedTodo: response.data.updatedTodo,
            message: response.data.message,
        };
    } catch (error: any) {
        if (error.response) {
            throw handleApiError(error);
        } else {
            throw new Error("Failed to complete todo");
        }
    }
};


// Update a todo
const updateTodo = async (todoUuid: string, todoData: { title?: string; description?: string; dueDate?: string }): Promise<{ updatedTodo: Todo; message: string }> => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.put(`${API_URL}/todos/${todoUuid}`, todoData, { headers });
        // Get the current todos from localStorage
        const currentTodos = JSON.parse(localStorage.getItem("todos") || "[]");

        // Find the index of the todo to update
        const index = currentTodos.findIndex((todo: Todo) => todo.uuid === todoUuid);
        if (index !== -1) {
            // Replace the old todo with the updated one
            currentTodos[index] = response.data.updatedTodo;
        } else {
            // If the todo is not found, add it to the list
            currentTodos.push(response.data.updatedTodo);
        }
        // Save updated todos to localStorage
        localStorage.setItem("todos", JSON.stringify(currentTodos));

        return {
            updatedTodo: response.data.updatedTodo,
            message: response.data.message,
        };
    } catch (error: any) {
        if (error.response) {
            throw handleApiError(error);
        } else {
            throw new Error("Failed to update todo");
        }
    }
}
const deleteTodo = async (todoUuid: string): Promise<{ message: string }> => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.delete(`${API_URL}/todos/${todoUuid}`, { headers });
        return {
            message: response.data.message,
        };
    } catch (error: any) {
        if (error.response) {
            throw handleApiError(error);
        } else {
            throw new Error("Failed to delete todo");
        }
    }
};
const todoService = {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
    completeTodoStatus,
};

export default todoService;