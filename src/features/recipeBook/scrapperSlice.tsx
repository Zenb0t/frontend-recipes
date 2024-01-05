import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Recipe } from "../../types/recipe";
import { ReduxStatus } from "../../consts";
import { scrapeRecipeUrl } from "../../api/scrapperApi";

export interface ScrapperState {
  recipe: Recipe | null ;
  status: ReduxStatus;
  error: any;
}

const initialState: ScrapperState = {
  recipe: null,
  status: ReduxStatus.IDLE,
  error: null,
};

export const scrapeRecipe = createAsyncThunk(
  "scrapper/scrapeRecipe",
  async (url: string, thunkAPI) => {
    try {
      const response = await scrapeRecipeUrl(url);
      if (!response) {
        throw new Error("Failed to scrape recipe");
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const scrapperSlice = createSlice({
  name: "scrapper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(scrapeRecipe.fulfilled, (state, action) => {
      state.status = ReduxStatus.SUCCESS;
      state.recipe = action.payload;
    });
    builder.addCase(scrapeRecipe.pending, (state) => {
      state.status = ReduxStatus.LOADING;
    });
    builder.addCase(scrapeRecipe.rejected, (state, action) => {
      state.status = ReduxStatus.FAILED;
      state.error = action.payload;
    });
  },
});

export default scrapperSlice.reducer;
