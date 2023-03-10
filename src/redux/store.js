import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import videosReducer from "./videosSlice";
import videoReducer from "./videoSlice";
import userReducer from "./userSlice";
import commentsReducer from "./commentsSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        common: commonReducer,
        videos: videosReducer,
        video: videoReducer,
        user: persistedUserReducer,
        comments: commentsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
