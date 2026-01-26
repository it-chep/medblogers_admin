import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog, IBlogCategory, IBlogState } from "../types";


const BlogInitialState: IBlogState = {
    blog: {
        title: '',
        doctor: {
            doctorId: -1,
            doctorName: '',
        },
        categories: [],
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
        setCategory(state, action: PayloadAction<IBlogCategory>){
            const copy = state.blog.categories;
            copy.push(action.payload)
            state.blog.categories = copy;
        },
        deleteCategory(state, action: PayloadAction<number>){
            const copy: IBlogCategory[] = JSON.parse(JSON.stringify(state.blog.categories))
            const targetInd = copy.findIndex(c => c.id === action.payload)
            if(targetInd >= 0){
                copy.splice(targetInd, 1)
                state.blog.categories = copy;
            }
        },
    }
})

export default BlogSlice.reducer