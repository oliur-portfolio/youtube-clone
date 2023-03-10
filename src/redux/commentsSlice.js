import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentComments: [],
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        fetchCommentsStart: (state) => {
            state.loading = true;
        },
        fetchCommentsSuccess: (state, action) => {
            state.loading = false;
            state.currentComments = action.payload;
        },
        fetchCommentsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchCommentsStart, fetchCommentsSuccess, fetchCommentsError } =
    commentsSlice.actions;

export const commentsLoadingState = (state) => state.comments.loading;
export const commentsDataState = (state) => state.comments.currentComments;
export const commentsErrorState = (state) => state.comments.error;

export default commentsSlice.reducer;
