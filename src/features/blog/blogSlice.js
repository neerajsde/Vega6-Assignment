import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiHandler from '../../utils/apiHandler';

// ✅ Async Thunk to Fetch Blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (_, thunkAPI) => {
  try {
    const response = await apiHandler('/user-blogs', 'GET', true);
    if (response.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Fetch failed');
      }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
  }
});

// ✅ Initial State
const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

// ✅ Slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.unshift(action.payload); // add new blog to the top
    },
    updateBlog: (state, action) => {
      const index = state.blogs.findIndex((blog) => blog._id === action.payload._id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

// ✅ Export actions
export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;

// ✅ Export reducer
export default blogSlice.reducer;
