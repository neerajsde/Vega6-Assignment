import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import apiHandler from "../utils/apiHandler";
import toast from "react-hot-toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_img", data.image[0]);
    let response = await apiHandler("/user", "POST", false, formData);
    if (response.success) {
      toast.success(response.message);
      reset();
      setImagePreview(null);
    }
    else{
      toast.error(response.message);
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full min-h-screen p-4 py-8 flex justify-center items-center">
      <div className="w-[450px] p-6 bg-white rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full p-2 border rounded-md outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full p-2 border rounded-md outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              className={`w-full p-2 border rounded-md outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            <label className="flex items-center gap-2 cursor-pointer p-3 border-2 border-dashed rounded-md text-gray-600 hover:border-blue-400 transition-all">
              <FiUploadCloud className="text-xl" />
              <span>Select an image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  required: "Image is required",
                  onChange: handleImagePreview,
                })}
              />
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-20 h-20 object-cover rounded-full"
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
