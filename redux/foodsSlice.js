import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import base from "../src/api/base"; // Replace with your API setup

// Async thunk to fetch food data
export const fetchFoods = createAsyncThunk("foods/fetchFoods", async (_, { rejectWithValue }) => {
  try {
    const records = await base("Foods").select({ view: "Grid view" }).all();
    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const foodsSlice = createSlice({
  name: "foods",
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: "",
    isSorted: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleSort: (state) => {
      state.isSorted = !state.isSorted;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSearchQuery, toggleSort } = foodsSlice.actions;

export default foodsSlice.reducer;
