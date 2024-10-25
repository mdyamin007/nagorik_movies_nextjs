import { combineReducers } from "@reduxjs/toolkit";
import { tmdbApiSlice } from "./features/apiSlice";
import themeReducer from "./features/themeSlice";
import favoritesReducer from "./features/favoritesSlice";

const rootReducer = combineReducers({
  [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
  theme: themeReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
