import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ParsedRecipe } from "../../types/recipe";
import { ReduxStatus } from "../../consts";
import { scrapeRecipeUrl } from "../../api/scrapperApi";

export interface ScrapperState {
  recipe: ParsedRecipe | null;
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
  reducers: {
    clearRecipe(state) {
      state.recipe = null;
    },
  },
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

export const { clearRecipe } = scrapperSlice.actions;

export default scrapperSlice.reducer;
