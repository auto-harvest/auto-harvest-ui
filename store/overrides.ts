import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { rootReducer, store } from "./store";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();
