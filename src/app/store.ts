import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import recipesReducer from "../features/recipeBook/recipeSlice";
import ingredientsReducer from "../features/recipeBook/ingredientSlice";
import scrapperReducer from "../features/recipeBook/scrapperSlice";

import userReducer from "../features/user/user-slice";


export const store = configureStore({
  reducer: {
    recipeBook: recipesReducer,
    scrapper: scrapperReducer,
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
