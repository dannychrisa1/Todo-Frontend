import axios, { AxiosError } from 'axios'
import { User } from "../dataTypes"

const API_URL = `${process.env.REACT_APP_BASEURL}/auth`

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

// Helper to save user data to localStorage
const saveUserToLocalStorage = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
};

//Register User 
const register = async (userData: { username: string; email: string; password: string }): Promise<{ user: User; message: string }> => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        // Check if the response contains a null user
        if (!response.data.user) {
            throw new Error("User already exists");
        }
        saveUserToLocalStorage(response.data);
        return {
            user: response.data,
            message: response.data.message
        }
    } catch (error: any) {
        if (error.response) {
            // Pass the full error response to handleApiError
            throw handleApiError(error);
        } else {
            throw new Error("Registration failed");
        }
    }
}

// Login user
const login = async (userData: { email: string; password: string }): Promise<{ user: User; token: string; message: string }> => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, {
            headers: { 'Content-Type': 'application/json' },
        });

        const { user, accessToken, message } = response.data;
        const token = accessToken.replace("Bearer ", "");
        localStorage.setItem("token", token);
        saveUserToLocalStorage(user);
        return { user, token, message };

    } catch (error: any) {
        if (error.response) {
            // Pass the full error response to handleApiError
            throw handleApiError(error);
        } else {
            throw new Error("Login failed");
        }
    }
};

const authService = {
    register,
    login
};

export default authService;