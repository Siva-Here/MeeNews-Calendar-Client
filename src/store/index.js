import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './slices/AuthSlice';
import { saveState, loadState } from './localStorageUtils';
const preloadedState = loadState();

const store = configureStore({
    reducer: {
        auth: AuthSlice
    },
    preloadedState
});



store.subscribe(() => {
    saveState({
        auth: store.getState().auth
    });
});

export default store;
