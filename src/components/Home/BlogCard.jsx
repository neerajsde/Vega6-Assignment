import React from "react";
import CommentSection from "./CommentSection";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
      <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover" />
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={blog.user_id.profile_img}
            alt={blog.user_id.name}
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-semibold text-lg">{blog.user_id.name}</h2>
        </div>
        <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
        <p className="text-gray-700 mb-4">{blog.description}</p>

        {/* Comments */}
        <CommentSection comments={blog.comments} blogId={blog._id} />
      </div>
    </div>
  );
};

export default BlogCard;
