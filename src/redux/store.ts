import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";
import { rootReducer } from "./rootReducer";
import storage from 'redux-persist/lib/storage' 
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'notes',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, AppState, unknown, AnyAction>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
