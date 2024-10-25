import { combineReducers } from "@reduxjs/toolkit";
import { tmdbApiSlice } from "./features/apiSlice";
import themeReducer from './features/themeSlice'


const rootReducer = combineReducers({
    [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
    theme: themeReducer
});

export default rootReducer;