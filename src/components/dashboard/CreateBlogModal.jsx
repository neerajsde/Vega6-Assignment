import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import apiHandler from "../../utils/apiHandler";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addBlog } from "../../features/blog/blogSlice";

const CreateBlogModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const [previewUrl, setPreviewUrl] = useState(null);

  const imageFile = watch("image");

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onFormSubmit = async (data) => {
    console.log(data);
    const payload = new FormData();
    payload.append("title", data.title);
    payload.append("desc", data.description);
    payload.append("blogImg", data.image[0]);
    const response = await apiHandler("/blog", "POST", true, payload);
    if (response.success) {
      toast.success(response.message);
      dispatch(addBlog(response.data));
      reset();
      setPreviewUrl(null);
      onClose();
    } else {
      toast.error(response.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Blog Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Blog image is required",
              })}
              onChange={(e) => {
                handleImagePreview(e);
              }}
              className="w-full"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 rounded-md max-h-60 object-cover"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                reset();
                setPreviewUrl(null);
                onClose();
              }}
              className="px-4 py-2 border rounded-md text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {isSubmitting ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={() => {
            reset();
            setPreviewUrl(null);
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CreateBlogModal;
