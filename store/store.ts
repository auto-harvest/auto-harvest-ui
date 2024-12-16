import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "./slices/api/apiSlice";
import authSlice from "./slices/persist/authSlice";
import socketMiddleware from "./middleware/socketMiddleware"; // Import the socketMiddleware
import socketSlice from "./slices/socketSlice";
import sensorInfoSlice from "./slices/api/sensorInfoSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { Platform } from "react-native";

// Persist configuration
const persistConfig = {
  key: "root",
  storage: Platform.OS === "web" ? storage : AsyncStorage,
  whitelist: ["auth", "user"], // Persisted slices
};

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [socketSlice.reducerPath]: socketSlice.reducer, // Add the socket reducer
  [sensorInfoSlice.reducerPath]: sensorInfoSlice.reducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSlice.middleware) // Add API middleware
      .concat(socketMiddleware),
});

// Persistor
const persistor = persistStore(store);

// Export store types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
