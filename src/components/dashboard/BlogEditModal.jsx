import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../../features/blog/blogSlice';
import apiHandler from '../../utils/apiHandler';
import toast from 'react-hot-toast';

const BlogEditModal = ({ isOpen, onClose, blog }) => {
  const dispatch = useDispatch();
  const [imgFile, setImgFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        description: blog.description || '',
        image: blog.image || '',
      });
      setPreviewImage(blog.image || '');
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("id", blog._id);
    payload.append("title", formData.title);
    payload.append("desc", formData.description);
    payload.append("blogImg", imgFile);
    const response = await apiHandler('/blog', "PUT", true, payload);
    if(response.success) {
        toast.success(response.message);
        dispatch(updateBlog({ ...blog, ...response.data }));
        onClose();
    }
    else{
        toast.error(response.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0000005e] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default BlogEditModal;
