import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog, IBlogState } from "../types";


const BlogInitialState: IBlogState = {
    blog: {
        title: '',
        slug: '',
        blogId: '',
        body: '',
        isActive: false,
        previewText: '',
        societyPreview: '',
        additionalSeoText: '',
        orderingNumber: 999,
    },
    isLoading: false,
    error: ''
}

export const BlogSlice = createSlice({
    name: 'blog',
    initialState: BlogInitialState,
    reducers: {
        setBody(state, action: PayloadAction<string>){
            state.blog.body = action.payload;
        },
        setBlog(state, action: PayloadAction<IBlog>){
            state.blog = action.payload;
        },
        setTitle(state, action: PayloadAction<string>){
            state.blog.title = action.payload;
        },
        setPrevTitle(state, action: PayloadAction<string>){
            state.blog.previewText = action.payload;
        },
        setPrevTitleOG(state, action: PayloadAction<string>){
            state.blog.societyPreview = action.payload;
        },
        setPrevAdditional(state, action: PayloadAction<string>){
            state.blog.additionalSeoText = action.payload;
        },
        setOrderingNumber(state, action: PayloadAction<string>){
            state.blog.orderingNumber = +action.payload;
        },
        setSlug(state, action: PayloadAction<string>){
            state.blog.slug = action.payload;
        },
        setIsActive(state, action: PayloadAction<boolean>){
            state.blog.isActive = action.payload;
        },
    }
})

export default BlogSlice.reducer