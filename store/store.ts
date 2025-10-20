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
import jwtMiddleware from "./middleware/jwtMiddleware";
import { authApi } from "./slices/api/authSlice";
import { squashedSensorInfoSlice } from "./slices/api/squashedSensorInfoSlice";
// Persist configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "user", "sensorInfo"], // Persisted slices
};

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [socketSlice.reducerPath]: socketSlice.reducer, // Add the socket reducer
  [sensorInfoSlice.reducerPath]: sensorInfoSlice.reducer,
  [squashedSensorInfoSlice.reducerPath]: squashedSensorInfoSlice.reducer,
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
      .concat(jwtMiddleware)
      .concat(socketMiddleware)
      .concat(authApi.middleware)
      .concat(apiSlice.middleware)
      .concat(squashedSensorInfoSlice.middleware), // Add API middleware
});

// Persistor
const persistor = persistStore(store);

// Export store types

export { store, persistor, rootReducer };
