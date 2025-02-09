import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slices/auth/authSlice"
import todoSliceReducer from "../slices/todo/todoSlice"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        todo: todoSliceReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
