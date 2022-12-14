import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeModel } from './models';
import recipesAPI from '../../services/recipes-api';
import clone from 'just-clone';


export interface RecipeState {
    recipeList: RecipeModel[];
    status: string;
    error: any;
}

const initialState: RecipeState = {
    recipeList: [] as RecipeModel[],
    status: 'idle',
    error: null,
};

export const createRecipe = createAsyncThunk(
    'recipes/createRecipe',
    async (recipe: RecipeModel, thunkAPI) => {
        try {
            const response = await recipesAPI.createRecipe(recipe);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
        const response = await recipesAPI.getRecipes();
        return response.data;
    }
);

export const updateRecipe = createAsyncThunk(
    'recipes/updateRecipe',
    async (recipe: RecipeModel, thunkAPI) => {
        try {
            const response = await recipesAPI.updateRecipe(recipe.id, recipe);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (recipeId: string, thunkAPI) => {
        try {
            const response = await recipesAPI.deleteRecipe(recipeId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteAllRecipes = createAsyncThunk(
    'recipes/deleteAllRecipes',
    async () => {
        try {
            const response = await recipesAPI.deleteAllRecipes();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const toggleFavorite = createAsyncThunk(
    'recipes/toggleFavorite',
    async (recipe: RecipeModel, thunkAPI) => {
        try {
            if (recipe) {
                const clonedRecipe = clone(recipe);

                clonedRecipe.favorite = !clonedRecipe.favorite;
                const response = await recipesAPI.updateRecipe(clonedRecipe.id, clonedRecipe);
                return response.data;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<RecipeModel[]>) => {
                state.recipeList = action.payload;
                state.status = 'success';
            })
            .addCase(fetchRecipes.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchRecipes.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(createRecipe.fulfilled, (state, action: PayloadAction<RecipeModel>) => {
                state.recipeList.push(action.payload);
                state.status = 'idle';
            })
            .addCase(createRecipe.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createRecipe.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(updateRecipe.fulfilled, (state, action: PayloadAction<RecipeModel>) => {
                const index = state.recipeList.findIndex(recipe => recipe.id === action.payload.id);
                state.recipeList[index] = {
                    ...state.recipeList[index],
                    ...action.payload,
                };
                state.status = 'idle';
            })
            .addCase(updateRecipe.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateRecipe.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(deleteRecipe.fulfilled, (state, action: PayloadAction<RecipeModel>) => {
                const index = state.recipeList.findIndex(recipe => recipe.id === action.payload.id);
                state.recipeList.splice(index, 1);
                state.status = 'idle';
            })
            .addCase(deleteRecipe.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteRecipe.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(deleteAllRecipes.fulfilled, (state, action: PayloadAction<RecipeModel>) => {
                state.recipeList = [];
                state.status = 'idle';
            })
            .addCase(deleteAllRecipes.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteAllRecipes.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<RecipeModel>) => {
                const index = state.recipeList.findIndex(recipe => recipe.id === action.payload.id);
                state.recipeList[index] = {
                    ...state.recipeList[index],
                    ...action.payload,
                };
            })
            .addCase(toggleFavorite.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(toggleFavorite.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'error';
                state.error = action.payload;
            });
    },
});

export const selectRecipes = (state: RootState) => state.recipeBook.recipeList as RecipeModel[];

export const selectFavoriteRecipes = (state: RootState) => state.recipeBook.recipeList.filter(recipe => recipe.favorite);

export const selectRecipeById = (state: RootState, id: string) => state.recipeBook.recipeList.find(recipe => recipe.id === id);

export default recipeSlice.reducer;