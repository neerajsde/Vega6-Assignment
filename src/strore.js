import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from "./features/blogs/blogSlice";
import userReducer from "./features/user/AuthSlice";
import blogReducer from "./features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    blog: blogReducer
  },
})