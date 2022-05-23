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
        console.log(response);
        return response.data;
    }
);

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<RecipeModel>) => {
            state.recipeList.push(action.payload);
        },
        removeRecipe: (state, action: PayloadAction<RecipeModel>) => {
            state.recipeList = state.recipeList.filter(recipe => recipe.id !== action.payload.id);
        },
        updateRecipe: (state, action: PayloadAction<RecipeModel>) => {
            const recipe = state.recipeList.find(recipe => recipe.id === action.payload.id);
            if (recipe) {
                Object.assign(recipe, action.payload);
            }
        },
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
        }
    }
});

export const selectRecipes = (state: RootState) => state.recipeBook.recipeList;

export const selectFavoriteRecipes = (state: RootState) => state.recipeBook.recipeList.filter(recipe => recipe.favorite);

export const selectRecipeById = (state: RootState, id: string) => state.recipeBook.recipeList.find(recipe => recipe.id === id);

export const { addRecipe, removeRecipe, updateRecipe, toggleFavorite, } = recipeSlice.actions;

export default recipeSlice.reducer;