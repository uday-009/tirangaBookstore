import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../../api/user";


// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await userServices.getCategories();
            if (res.status) {
                return res.data;
            } else {
                return rejectWithValue("Error fetching categories");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;
