import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "./foodsSlice";
import favoritesReducer from "./favouritesSlice";

const store = configureStore({
  reducer: {
    foods: foodsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
