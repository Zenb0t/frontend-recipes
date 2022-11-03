import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IngredientModel } from './models';
import recipesAPI from '../../services/recipes-api';
import clone from 'just-clone';

export interface IngredientState {
    ingredientList: IngredientModel[];
    status: string;
    error: any;
}

const initialState: IngredientState = {
    ingredientList: [] as IngredientModel[],
    status: 'idle',
    error: null,
};

export const createIngredient = createAsyncThunk(
    'recipes/createIngredient',
    async (ingredient: IngredientModel, thunkAPI) => {
        try {
            const response = await recipesAPI.createIngredient(ingredient);
            console.log(`Create Ingredient resp: ${response.data}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchIngredients = createAsyncThunk(
    'recipes/fetchIngredients',
    async () => {
        const response = await recipesAPI.fetchIngredients();
        console.log(`Fetch resp: ${response.data}`);
        return response.data;
    }
);

export const updateIngredient = createAsyncThunk(
    'recipes/updateIngredient',
    async (ingredient: IngredientModel, thunkAPI) => {
        try {
            const response = await recipesAPI.updateIngredient(ingredient.id, ingredient);
            console.log(`Update Ingredient resp: ${response.data}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteIngredient = createAsyncThunk(
    'recipes/deleteIngredient',
    async (ingredientId: string, thunkAPI) => {
        try {
            const response = await recipesAPI.deleteIngredient(ingredientId);
            console.log(`Delete Ingredient resp: ${response.data}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {},
    extraReducers: {
        [createIngredient.fulfilled.type]: (state, action: PayloadAction<IngredientModel>) => {
            state.ingredientList.push(action.payload);
        },
        [fetchIngredients.fulfilled.type]: (state, action: PayloadAction<IngredientModel[]>) => {
            state.ingredientList = action.payload;
        },
        [updateIngredient.fulfilled.type]: (state, action: PayloadAction<IngredientModel>) => {
            const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
            state.ingredientList[index] = {
                ...state.ingredientList[index],
                ...action.payload};
        },
        [deleteIngredient.fulfilled.type]: (state, action: PayloadAction<IngredientModel>) => {
            const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
            if (index > -1) {
            state.ingredientList.splice(index, 1);
            }
        },
    },
});
   
export const selectIngredientList = (state: RootState) => state.ingredients.ingredientList as IngredientModel[];

export default ingredientSlice.reducer;




