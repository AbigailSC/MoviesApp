import { configureStore } from '@reduxjs/toolkit';
import { UI } from '../slices/UI';
import movies from "../slices/movies/index"

export default configureStore({
  reducer: {
    UI: UI.reducer,
    movies
  }
});
