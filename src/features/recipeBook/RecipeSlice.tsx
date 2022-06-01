import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeModel } from './RecipeBookModels';
import recipesAPI from '../../services/RecipesAPI';


//TODO: Replace with real API call
//TODO: Add error handling and loading state for async actions


export interface RecipeState {
    recipeList: RecipeModel[];
    status: string;
    error: any;
}

const initialState: RecipeState = {
    recipeList: [] as RecipeModel[], // will be initialized from async external API call.
    status: 'idle',
    error: null,
};

export const createRecipe = createAsyncThunk(
    'recipeBook/createRecipe',
    async (recipe: RecipeModel, thunkAPI) => {
        try {
            const response = await recipesAPI.createRecipe(recipe);
            console.log(`Create Recipe resp: ${response.data}`);
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
        console.log(`Fetch resp: ${response.data}`);
        return response.data;
    }
);

export const updateRecipe = createAsyncThunk(
    'recipeBook/updateRecipe',
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
    'recipeBook/deleteRecipe',
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
    'recipeBook/deleteAllRecipes',
    async (thunkAPI) => {
        try {
            const response = await recipesAPI.deleteAllRecipes();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<RecipeModel>) => {
            const recipe = state.recipeList.find(recipe => recipe.id === action.payload.id);
            if (recipe) {
                recipe.favorite = !recipe.favorite;
            }
        },
    },
    extraReducers: {
        [fetchRecipes.fulfilled.type]: (state, action: PayloadAction<RecipeModel[]>) => {
            state.recipeList = action.payload;
        },
        [fetchRecipes.pending.type]: (state, action: PayloadAction<RecipeModel[]>) => {
            state.status = 'loading';
        },
        [fetchRecipes.rejected.type]: (state, action: PayloadAction<any>) => {
            state.status = 'error';
            state.error = action.payload;
        },
        [createRecipe.fulfilled.type]: (state, action: PayloadAction<RecipeModel>) => {
            state.recipeList.push(action.payload);
        },
        [createRecipe.pending.type]: (state, action: PayloadAction<RecipeModel>) => {
            state.status = 'loading';
        },
        [createRecipe.rejected.type]: (state, action: PayloadAction<any>) => {
            state.status = 'error';
            state.error = action.payload;
        },
        [updateRecipe.fulfilled.type]: (state, action: PayloadAction<RecipeModel>) => {
            const index = state.recipeList.findIndex(recipe => recipe.id === action.payload.id);
            state.recipeList[index] = {
                ...state.recipeList[index],
                ...action.payload
            };
        },
        [updateRecipe.pending.type]: (state, action: PayloadAction<RecipeModel>) => {
            state.status = 'loading';
        },
        [updateRecipe.rejected.type]: (state, action: PayloadAction<any>) => {
            state.status = 'error';
            state.error = action.payload;
        },
        [deleteRecipe.fulfilled.type]: (state, action: PayloadAction<RecipeModel>) => {
            const recipeIndex = state.recipeList.findIndex(recipe => recipe.id === action.payload.id);
            if (recipeIndex > -1) {
                state.recipeList.splice(recipeIndex, 1);
            }
        },
        [deleteRecipe.pending.type]: (state, action: PayloadAction<RecipeModel>) => {
            state.status = 'loading';
        },
        [deleteRecipe.rejected.type]: (state, action: PayloadAction<any>) => {
            state.status = 'error';
            state.error = action.payload;
        },
    },
});

export const selectRecipes = (state: RootState) => state.recipeBook.recipeList;

export const selectFavoriteRecipes = (state: RootState) => state.recipeBook.recipeList.filter(recipe => recipe.favorite);

export const selectRecipeById = (state: RootState, id: string) => state.recipeBook.recipeList.find(recipe => recipe.id === id);

export const { toggleFavorite, } = recipeSlice.actions;

export default recipeSlice.reducer;