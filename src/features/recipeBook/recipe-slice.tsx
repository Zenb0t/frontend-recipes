import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Recipe } from "../../types/recipe";
import { RecipeApi } from "../../api/recipeApi";
import { ReduxStatus } from "../../consts";

export interface RecipeState {
  recipeList: Recipe[];
  status: ReduxStatus;
  error: any;
}

const initialState: RecipeState = {
  recipeList: [] as Recipe[],
  status: ReduxStatus.IDLE,
  error: null,
};

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipe: Recipe, thunkAPI) => {
    try {
      const response = await RecipeApi.createRecipe(recipe);
      if (response) {
        return response.data;
      } else {
        throw new Error("Failed to create recipe");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id: string, thunkAPI) => {
    try {
      const response = await RecipeApi.getRecipe(id);
      if (!response) {
        throw new Error("Failed to fetch recipe");
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, thunkAPI) => {
    try {
      const response = await RecipeApi.getRecipes();
      console.log("Response: ", response);
      if (!response) {
        throw new Error("Failed to fetch recipes");
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe: Recipe, thunkAPI) => {
    try {
      if (!recipe._id) {
        throw new Error("Recipe ID is undefined");
      }
      const response = await RecipeApi.updateRecipe(recipe._id, recipe);
      if (!response) {
        throw new Error("Failed to update recipe");
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (recipeId: string, thunkAPI) => {
    try {
      const response = await RecipeApi.deleteRecipe(recipeId);
      if (!response) {
        throw new Error("Failed to delete recipe");
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.recipeList = action.payload;
          state.status = ReduxStatus.SUCCESS;
        }
      )
      .addCase(fetchRecipes.pending, (state, action) => {
        state.status = ReduxStatus.LOADING;
      })
      .addCase(fetchRecipes.rejected, (state, action: PayloadAction<any>) => {
        state.status = ReduxStatus.FAILED;
        console.debug("Error fetching recipes: ", action.payload);
        state.error = action.payload;
      })
      .addCase(
        createRecipe.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.recipeList.push(action.payload);
          state.status = ReduxStatus.SUCCESS;
        }
      )
      .addCase(createRecipe.pending, (state, action) => {
        state.status = ReduxStatus.LOADING;
      })
      .addCase(createRecipe.rejected, (state, action: PayloadAction<any>) => {
        state.status = ReduxStatus.FAILED;
        state.error = action.payload;
      })
      .addCase(
        updateRecipe.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          const index = state.recipeList.findIndex(
            (recipe) => recipe._id === action.payload._id
          );
          state.recipeList[index] = {
            ...state.recipeList[index],
            ...action.payload,
          };
          state.status = ReduxStatus.SUCCESS;
        }
      )
      .addCase(updateRecipe.pending, (state, action) => {
        state.status = ReduxStatus.LOADING;
      })
      .addCase(updateRecipe.rejected, (state, action: PayloadAction<any>) => {
        state.status = ReduxStatus.FAILED;
        state.error = action.payload;
      })
      .addCase(
        deleteRecipe.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          const index = state.recipeList.findIndex(
            (recipe) => recipe._id === action.payload._id
          );
          state.recipeList.splice(index, 1);
          state.status = ReduxStatus.SUCCESS;
        }
      )
      .addCase(deleteRecipe.pending, (state, action) => {
        state.status = ReduxStatus.LOADING;
      })
      .addCase(deleteRecipe.rejected, (state, action: PayloadAction<any>) => {
        state.status = ReduxStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export const selectRecipes = (state: RootState) =>
  state.recipeBook.recipeList as Recipe[];

// export const selectFavoriteRecipes = (state: RootState) =>
//   state.recipeBook.recipeList.filter((recipe) => recipe.favorite);

export const selectRecipeById = (state: RootState, id: string) =>
  state.recipeBook.recipeList.find((recipe) => recipe._id === id);

export default recipeSlice.reducer;
