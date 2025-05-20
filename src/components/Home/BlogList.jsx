import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;