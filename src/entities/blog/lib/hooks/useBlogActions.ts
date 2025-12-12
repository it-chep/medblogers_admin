import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { BlogSlice } from "../../model/reducers/BlogSlice";



export const useBlogActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(BlogSlice.actions, dispatch)
}