import React, { useState } from "react";
import Comment from "./Comment";
import apiHandler from "../../utils/apiHandler";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../../features/blogs/blogSlice";

const CommentSection = ({ blogId, comments }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentSubmit = async(e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const res = await apiHandler(`/blog-comment/${blogId}`, "POST", true, {message: newComment});
      if(res.success){
        dispatch(fetchBlogs());
        toast.success("Comment added successfully");
        setNewComment("");
      }
      else{
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Comments</h4>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded-lg"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 cursor-pointer text-white px-4 rounded-lg"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
