import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { blogReducer } from "../../entities/blog";
import { globalMessageReducer } from "../../entities/globalMessage";
import { globalLoadingReducer } from "../../entities/globalLoading";
import { userReducer } from "../../entities/user";
import { doctorReducer } from "../../entities/doctor";




export const store = configureStore({
    reducer: {
        blogReducer,
        globalMessageReducer,
        globalLoadingReducer,
        userReducer,
        doctorReducer,
        
    }
})



type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch