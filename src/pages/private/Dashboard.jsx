import React, { useEffect, useState } from "react";
import BlogTable from "../../components/dashboard/BlogTable";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/spinner/Loader";
import { deleteBlog, fetchBlogs } from "../../features/blog/blogSlice";
import BlogEditModal from "../../components/dashboard/BlogEditModal";
import apiHandler from "../../utils/apiHandler";
import toast from "react-hot-toast";
import CreateBlogModal from "../../components/dashboard/CreateBlogModal";

const BlogDashboard = () => {
  const { loading, blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [editBlog, setEditBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const openEditModal = (blog) => {
    setEditBlog(blog);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!loading) {
      dispatch(fetchBlogs());
    }
  }, []);

  const handleEdit = (blog) => {
    openEditModal(blog);
  };

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const response = await apiHandler(`/blog/${id}`, "DELETE", true);
      if (response.success) {
        toast.success(response.message)
        dispatch(deleteBlog(id));
      } else {
        toast.error(response.message);
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 p-6 relative bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Blogs</h2>
        <button onClick={() => setIsModalCreateOpen(true)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Blog
        </button>
      </div>
      <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />

      {isModalOpen && (
        <BlogEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          blog={editBlog}
        />
      )}

      {isModalCreateOpen && (
        <CreateBlogModal
          isOpen={isModalCreateOpen}
          onClose={() => setIsModalCreateOpen(false)}
        />
      )}
    </div>
  );
};

export default BlogDashboard;
