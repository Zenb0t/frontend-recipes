import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IngredientModel } from './models';
import recipesAPI from '../../services/recipes-api';

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
        return response.data;
    }
);

export const updateIngredient = createAsyncThunk(
    'recipes/updateIngredient',
    async (ingredient: IngredientModel, thunkAPI) => {
        try {
            const response = await recipesAPI.updateIngredient(ingredient.id, ingredient);
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
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IngredientModel[]>) => {
                state.ingredientList = action.payload;
            })
            .addCase(updateIngredient.fulfilled, (state, action: PayloadAction<IngredientModel>) => {
                const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
                state.ingredientList[index] = {
                    ...state.ingredientList[index],
                    ...action.payload};
            })
            .addCase(deleteIngredient.fulfilled, (state, action: PayloadAction<IngredientModel>) => {
                const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
                state.ingredientList.splice(index, 1);
            })
            .addCase(createIngredient.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
            })
            .addCase(updateIngredient.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
            })
            .addCase(deleteIngredient.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
            })
    },


    // extraReducers: {
    //     [createIngredient.fulfilled.type]: (state, action: PayloadAction<IngredientModel>) => {
    //         state.ingredientList.push(action.payload);
    //     },
    //     [fetchIngredients.fulfilled.type]: (state, action: PayloadAction<IngredientModel[]>) => {
    //         state.ingredientList = action.payload;
    //     },
    //     [updateIngredient.fulfilled.type]: (state, action: PayloadAction<IngredientModel>) => {
    //         const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
    //         state.ingredientList[index] = {
    //             ...state.ingredientList[index],
    //             ...action.payload};
    //     },
    //     [deleteIngredient.fulfilled.type]: (state, action: PayloadAction<IngredientModel>) => {
    //         const index = state.ingredientList.findIndex(ingredient => ingredient.id === action.payload.id);
    //         if (index > -1) {
    //         state.ingredientList.splice(index, 1);
    //         }
    //     },
    // },
});

export const selectIngredientById = (state: RootState, ingredientId: string) => {
    return state.ingredients.ingredientList.find(ingredient => ingredient.id === ingredientId);
};
 
export const selectIngredientList = (state: RootState) => state.ingredients.ingredientList as IngredientModel[];

export default ingredientSlice.reducer;




