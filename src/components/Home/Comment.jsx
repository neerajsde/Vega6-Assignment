import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../../features/blogs/blogSlice";
import apiHandler from "../../utils/apiHandler";

const Comment = ({ comment }) => {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);
  const dispatch = useDispatch();

  const handleReplySubmit = async(e) => {
    e.preventDefault();
    if (reply.trim()) {
      const res = await apiHandler(`/comment-reply/${comment._id}`, "POST", true, {message: reply});
      if(res.success){
        dispatch(fetchBlogs());
        toast.success("Reply added successfully");
        setReply("");
        setShowReply(false);
      }
      else{
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-3 rounded-xl">
      <div className="flex gap-2 items-start mb-1">
        <img
          src={comment.user_id.profile_img}
          alt={comment.user_id.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-semibold">{comment.user_id.name}</p>
          <p className="text-gray-800">{comment.message}</p>
        </div>
      </div>

      <button
        className="text-sm text-blue-500 mt-1 cursor-pointer"
        onClick={() => setShowReply(!showReply)}
      >
        {showReply ? "Cancel" : "Reply"}
      </button>

      {showReply && (
        <form onSubmit={handleReplySubmit} className="mt-2 flex gap-2">
          <input
            type="text"
            className="flex-1 border p-1 rounded-lg"
            placeholder="Write a reply..."
            value={reply}
            required
            onChange={(e) => setReply(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 cursor-pointer text-white px-3 rounded-lg"
          >
            Reply
          </button>
        </form>
      )}

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-3 ml-6 space-y-2">
          {comment.replies.map((rep) => (
            <div key={rep._id} className="bg-white p-2 rounded-lg shadow-sm border">
              <div className="flex gap-2 items-start">
                <img
                  src={rep.user_id.profile_img}
                  alt={rep.user_id.name}
                  className="w-7 h-7 rounded-full"
                />
                <div>
                  <p className="font-medium">{rep.user_id.name}</p>
                  <p className="text-sm text-gray-700">{rep.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
