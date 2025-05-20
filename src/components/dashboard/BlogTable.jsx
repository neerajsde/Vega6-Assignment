import React from "react";

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300 shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Comments</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{blog.title}</td>
              <td className="border px-4 py-2">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-16 w-24 object-cover mx-auto rounded"
                />
              </td>
              <td className="border px-4 py-2 text-sm text-left">
                {blog.description.slice(0, 100)}...
              </td>
              <td className="border px-4 py-2">{blog.comments.length}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(blog)}
                  className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(blog._id)}
                  className="bg-red-500 cursor-pointer text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {blogs.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No Blogs Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
