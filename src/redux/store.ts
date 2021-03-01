import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer } from './rootReducer';
import storage from 'redux-persist/lib/storage';
import {
    createStateSyncMiddleware,
    initMessageListener,
} from 'redux-state-sync';


const persistConfig = {
    key: 'notes',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk, createStateSyncMiddleware()];

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);
export const persistor = persistStore(store);

initMessageListener(store);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, AppState, unknown, AnyAction>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
