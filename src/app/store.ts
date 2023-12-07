import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipeBook/recipe-slice';
import ingredientsReducer from '../features/recipeBook/ingredient-slice';

import userReducer from '../features/user/user-slice';

export const store = configureStore({
  reducer: {
    recipeBook: recipesReducer,
    ingredients: ingredientsReducer,
    users: userReducer,
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
