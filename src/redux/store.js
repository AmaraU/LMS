import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

// services
import { authApi } from "./services/auth.service";
import { libraryApi } from "./services/library.service";

// reducers
import authReducer from "./slices/authSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
});

// Wrap with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        app: persistedReducer,
        [authApi.reducerPath]: authApi.reducer,
        [libraryApi.reducerPath]: libraryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            authApi.middleware,
            libraryApi.middleware,
        ]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export const useAppSelector = useSelector;
