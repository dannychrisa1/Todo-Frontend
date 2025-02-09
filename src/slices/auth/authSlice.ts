import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginFormData, SignUpFormData, User } from "../../dataTypes";
import authService from "../../helpers/authService";
import { toast } from "react-toastify";

type InitialState = {
    user: User | null
    token: string | null
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string
    messages: string[]
}

const storedRegisterUser = localStorage.getItem("user");
const user = storedRegisterUser ? JSON.parse(storedRegisterUser) : null;
const storedToken = localStorage.getItem("token");

const initialState: InitialState = {
    user: user || null,
    token: storedToken,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    messages: []
}

export const register = createAsyncThunk<
    { user: User; message: string },
    SignUpFormData,
    { rejectValue: { message: string; messages: string[] } }
>("auth/register", async (userData, thunkApi) => {
    try {
        const response = await authService.register(userData)
        return response;
    } catch (error: any) {
        const message = error.message || "Registration failed";
        const messages = error.messages || [];
        return thunkApi.rejectWithValue({ message, messages });
    }
})

export const login = createAsyncThunk<
    { user: User; token: string; message: string },
    LoginFormData,
    { rejectValue: { message: string; messages: string[] } }
>("auth/login", async (userData, thunkApi) => {
    try {
        const response = await authService.login(userData);
        return {
            user: response.user,
            token: response.token,
            message: response.message,
        };
    } catch (error: any) {
        // Extract the message and ignore the messages array for login
        const message = error.message || "Login failed";;
        return thunkApi.rejectWithValue({ message, messages: [] });
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
            state.messages = []; // Reset messages on reset

        },
        userRestored: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
            state.messages = [];
            // Remove user data from localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
        },

    },
    extraReducers: (builder) => {
        builder
            //Register Reducers
            .addCase(register.pending, (state) => {
                state.isLoading = true
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
                state.messages = [];
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.user
                state.message = action.payload.message
                state.messages = [];
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload?.message || "Registration failed";
                state.messages = action.payload?.messages || [];

                // Display the `messages` array in toast notifications
                if (action.payload?.messages && action.payload.messages.length > 0) {
                    action.payload.messages.forEach((msg) => toast.error(msg)); // Show each validation error
                } else {
                    // If no `messages` array is present, display the fallback `message`
                    toast.error(action.payload?.message || "Registration failed");
                }

            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.user
                state.token = action.payload.token;
                state.message = action.payload.message
                toast.success(action.payload.message);
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true;
                state.user = null;
                const payload = action.payload as { message: string; messages: string[] } | undefined;
                if (payload) {
                    state.message = payload.message;
                    state.messages = payload.messages || [];
                    toast.error(payload.message);
                } else {
                    state.message = "Login failed";
                    state.messages = [];
                    toast.error("Login failed");
                }
            })
    }
})

export const { reset, setToken, userRestored, logout } = authSlice.actions;
export default authSlice.reducer