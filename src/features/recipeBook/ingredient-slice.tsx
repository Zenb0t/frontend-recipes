import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IngredientModel } from './models';
import apiService from '../../api/api';

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
            const response = await apiService().createIngredient(ingredient);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchIngredients = createAsyncThunk(
    'recipes/fetchIngredients',
    async (userId, thunkAPI) => {
        let state = thunkAPI.getState() as RootState;
        let email = state.users.userInfo?.email;
        const response = await apiService().fetchIngredients();
        return response.data;
    }
);

export const updateIngredient = createAsyncThunk(
    'recipes/updateIngredient',
    async (ingredient: IngredientModel, thunkAPI) => {
        try {
            const response = await apiService().updateIngredient(ingredient.id, ingredient);
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
            const response = await apiService().deleteIngredient(ingredientId);
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

    extraReducers: (builder) => {
        builder
            .addCase(createIngredient.fulfilled, (state, action: PayloadAction<IngredientModel>) => {
                state.ingredientList.push(action.payload);
                state.status = 'idle';
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IngredientModel[]>) => {
                state.ingredientList = action.payload;
                state.status = 'success';
            })
            .addCase(updateIngredient.fulfilled, (state, action: PayloadAction<IngredientModel>) => {
                const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
                state.ingredientList[index] = {
                    ...state.ingredientList[index],
                    ...action.payload
                };
                state.status = 'idle';
            })
            .addCase(deleteIngredient.fulfilled, (state, action: PayloadAction<IngredientModel>) => {
                const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
                state.ingredientList.splice(index, 1);
            })
            .addCase(createIngredient.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
                state.status = 'error';
            })
            .addCase(updateIngredient.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
                state.status = 'error';
            })
            .addCase(deleteIngredient.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
                state.status = 'error';
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
                state.status = 'error';
            })
            .addCase(createIngredient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateIngredient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteIngredient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
            });

    },
});

export const selectIngredientById = (state: RootState, ingredientId: string) => {
    return state.ingredients.ingredientList.find(ingredient => ingredient.id === ingredientId);
};

export const selectIngredientList = (state: RootState) => state.ingredients.ingredientList as IngredientModel[];

export default ingredientSlice.reducer;




