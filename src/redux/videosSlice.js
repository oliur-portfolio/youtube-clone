import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [],
    loading: true,
    error: null,
};

const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        fetchVideosStart: (state) => {
            state.loading = true;
        },
        fetchVideosSuccess: (state, action) => {
            state.videos = action.payload;
            state.loading = false;
        },
        fetchVideosError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchVideosStart, fetchVideosSuccess, fetchVideosError } =
    videosSlice.actions;

export const videosLoadingState = (state) => state.videos.loading;
export const videosDataState = (state) => state.videos.videos;
export const videosErrorState = (state) => state.videos.error;

export default videosSlice.reducer;
