import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo: {},
    loading: true,
    error: null,
};

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchVideoLoading: (state) => {
            state.loading = true;
        },
        fetchVideoSuccess: (state, action) => {
            state.currentVideo = action.payload;
            state.loading = false;
        },
        fetchVideoError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        likeVideo: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload);

                state.currentVideo.dislikes.splice(
                    state.currentVideo.dislikes.findIndex(
                        (val) => val === action.payload
                    ),
                    1
                );
            }
        },
        dislikeVideo: (state, action) => {
            if (!state.currentVideo.dislikes.includes(action.payload)) {
                state.currentVideo.dislikes.push(action.payload);

                state.currentVideo.likes.splice(
                    state.currentVideo.likes.findIndex(
                        (val) => val === action.payload
                    ),
                    1
                );
            }
        },
    },
});

export const {
    fetchVideoSuccess,
    fetchVideoLoading,
    fetchVideoError,
    likeVideo,
    dislikeVideo,
} = videoSlice.actions;

export const videoLoadingState = (state) => state.video.loading;
export const videoDataState = (state) => state.video.currentVideo;
export const videoErrorState = (state) => state.video.error;

export default videoSlice.reducer;
