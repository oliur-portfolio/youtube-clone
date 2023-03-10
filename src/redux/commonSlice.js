import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videomodal: false,
    sideBar: true,
    commentSort: "desc",
    tagsValue: "all",
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        showVideo: (state) => {
            state.videomodal = !state.videomodal;
        },
        showSidebar: (state) => {
            state.sideBar = true;
        },
        hideSidebar: (state) => {
            state.sideBar = false;
        },
        setCommentSort: (state, action) => {
            state.commentSort = action.payload;
        },
        setTagsValue: (state, action) => {
            state.tagsValue = action.payload;
        },
    },
});

export const {
    showVideo,
    showSidebar,
    hideSidebar,
    setCommentSort,
    setTagsValue,
} = commonSlice.actions;

export const videoModalState = (state) => state.common.videomodal;
export const sidebarState = (state) => state.common.sideBar;
export const commentSortState = (state) => state.common.commentSort;
export const tagsValueState = (state) => state.common.tagsValue;

export default commonSlice.reducer;
