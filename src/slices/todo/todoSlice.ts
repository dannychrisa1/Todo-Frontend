import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTodoFormData, Todo } from "../../dataTypes";
import { toast } from "react-toastify";
import todoService from "../../helpers/todoService";

type InitialState = {
    todo: Todo
    todos: Todo[]
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    message: string
    messages: string[]
}
const loadTodosFromLocalStorage = (): Todo[] => {
    try {
        const todos = localStorage.getItem('todos');
        if (todos) {
            return JSON.parse(todos);
        }
    } catch (error) {
        console.error("Error loading todos from localStorage:", error);
    }
    return [];
};

const storedCreatedTodo = localStorage.getItem('todo');
const todo = storedCreatedTodo ? JSON.parse(storedCreatedTodo) : null;

const initialState: InitialState = {
    todo: todo,
    todos: loadTodosFromLocalStorage(),
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    messages: []
}

export const createTodo = createAsyncThunk<
    { todo: Todo; message: string },
    createTodoFormData,
    { rejectValue: { message: string; messages: string[] } }
>("todo/create-todo", async (todoData, thunkApi) => {
    try {
        const response = await todoService.createTodo(todoData)
        return response;
    } catch (error: any) {
        const message = error.message || "cretaing todo failed";
        const messages = error.messages || [];
        return thunkApi.rejectWithValue({ message, messages });
    }
})

export const getAllTodos = createAsyncThunk<
    { todos: Todo[]; message: string },
    void,
    { rejectValue: { message: string; messages: string[] } }
>("todos/getAll", async (_, thunkApi) => {
    try {
        const response = await todoService.getAllTodos();
        return { todos: response.todos, message: response.message };
    } catch (error: any) {
        const message = error.message || "failed fetching Todos";
        const messages = error.messages || [];
        return thunkApi.rejectWithValue({ message, messages });
    }
});

export const updateTodo = createAsyncThunk<
    { updatedTodo: Todo; message: string },
    { todoUuid: string; todoData: { title?: string; description?: string; dueDate?: string } },
    { rejectValue: { message: string; messages: string[] } }
>("todo/updateTodo", async ({ todoUuid, todoData }, thunkApi) => {
    try {
        const response = await todoService.updateTodo(todoUuid, todoData);
        return response;
    } catch (error: any) {
        const message = error.message || "Failed to update todo";
        const messages = error.messages || [];
        return thunkApi.rejectWithValue({ message, messages });
    }
});

//Complete TodoStatus
export const completeTodoStatus = createAsyncThunk<
    { updatedTodo: Todo; message: string },
    string,
    { rejectValue: { message: string; messages: string[] } }
>("todo/completeTodoStatus", async (todoUuid, thunkApi) => {
    try {
        const response = await todoService.completeTodoStatus(todoUuid);
        return response;
    } catch (error: any) {
        const message = error.message || "Failed to complete todo";
        const messages = error.messages || [];
        return thunkApi.rejectWithValue({ message, messages });
    }
});

// Delete a todo
export const deleteTodo = createAsyncThunk<
    { message: string },
    string,
    { rejectValue: { message: string; messages: string[] } }
>("todo/deleteTodo", async (todoUuid, thunkApi) => {
    try {
        const response = await todoService.deleteTodo(todoUuid);
        return response;
    } catch (error: any) {
        const message = error.message || "Failed to delete todo";
        const messages = error.messages || [];
        return thunkApi.rejectWithValue({ message, messages });
    }
});
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
            state.messages = []
        },
    },
    extraReducers: (builder) => {
        builder
            //CreateTodo 
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // Add the new todo to the list
                state.todos = [action.payload.todo, ...state.todos];
                state.message = action.payload.message;
                localStorage.setItem('todos', JSON.stringify(state.todos));
            })
            .addCase(createTodo.rejected, (state, action: PayloadAction<{ message: string; messages: string[] } | undefined>) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message || "Registration failed";
                state.messages = action.payload?.messages || [];
                // Display the `messages` array in toast notifications
                if (action.payload?.messages && action.payload.messages.length > 0) {
                    action.payload.messages.forEach((msg: string) => toast.error(msg)); // Show each validation error
                } else {
                    // If no `messages` array is present, display the fallback `message`
                    toast.error(action.payload?.message || "Failed to create todo");
                }
            })

            //getAllTodos
            .addCase(getAllTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = action.payload.todos;
                state.message = action.payload.message
                localStorage.setItem('todos', JSON.stringify(state.todos));
            })
            .addCase(getAllTodos.rejected, (state, action: PayloadAction<{ message: string; messages: string[] } | undefined>) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message || "Registration failed";
                state.messages = action.payload?.messages || [];
                // Display the `messages` array in toast notifications
                if (action.payload?.messages && action.payload.messages.length > 0) {
                    action.payload.messages.forEach((msg: string) => toast.error(msg));
                } else {
                    // If no `messages` array is present, display the fallback `message`
                    toast.error(action.payload?.message || "Failed to create todo");
                }
            })

            // Update Todo
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                console.log("Updated Todo from Fulfilled:", action.payload);

                if (action.payload.updatedTodo) {
                    const index = state.todos.findIndex(todo => todo.uuid === action.payload.updatedTodo.uuid);

                    if (index !== -1) {
                        state.todos[index] = action.payload.updatedTodo;
                    } else {
                        state.todos.push(action.payload.updatedTodo);
                    }
                    //update localStorage
                    localStorage.setItem("todos", JSON.stringify(state.todos));
                }
            })

            .addCase(updateTodo.rejected, (state, action: PayloadAction<{ message: string; messages: string[] } | undefined>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to update todo";
                state.messages = action.payload?.messages || [];
                if (action.payload?.messages && action.payload.messages.length > 0) {
                    action.payload.messages.forEach((msg: string) => toast.error(msg));
                } else {
                    toast.error(action.payload?.message || "Failed to update todo");
                }
            })
            .addCase(completeTodoStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(completeTodoStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload.updatedTodo) {
                    state.todos = state.todos.map((todo) =>
                        todo.uuid === action.payload.updatedTodo.uuid ? action.payload.updatedTodo : todo
                    );
                }

                state.message = action.payload.message;
                toast.success(action.payload.message);
                localStorage.setItem("todos", JSON.stringify(state.todos));
            })
            .addCase(completeTodoStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to complete todo";
                state.messages = action.payload?.messages || [];
                toast.error(action.payload?.message || "Failed to complete todo");
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = state.todos.filter((todo) => todo.uuid !== action.meta.arg);
                state.message = action.payload.message;
                toast.success(action.payload.message);
                // Update localStorage
                localStorage.setItem('todos', JSON.stringify(state.todos));
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to delete todo";
                state.messages = action.payload?.messages || [];
                toast.error(action.payload?.message || "Failed to delete todo");
            })
    }
})

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;