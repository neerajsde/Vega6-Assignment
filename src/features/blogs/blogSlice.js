import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiHandler from '../../utils/apiHandler';

// Thunk to fetch blog data
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, thunkAPI) => {
    try {
      const res = await apiHandler("/blogs");
      if (res.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.message || 'Fetch failed');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Fetch failed');
    }
  }
);

const initialState = {
  loading: false,
  error: '',
  data: [],
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch blogs';
      });
  },
});

export const { loading } = blogSlice.actions;
export default blogSlice.reducer;