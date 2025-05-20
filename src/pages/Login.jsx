import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import apiHandler from "../utils/apiHandler";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async(data) => {
    let response = await apiHandler("/login", "POST", false, data);
    console.log(response);
    if (response.success) {
      Cookies.set("tokenz", response.data.token, { expires: 10 });
      dispatch(fetchUser());
      toast.success(response.message);
      reset();
      navigate("/dashboard");
    }
    else{
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 py-8 flex justify-center items-center">
    <div className="w-[450px] p-6 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
