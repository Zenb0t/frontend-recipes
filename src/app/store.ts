import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipeBook/RecipeSlice';

export const store = configureStore({
  reducer: {
    recipeBook: recipesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
