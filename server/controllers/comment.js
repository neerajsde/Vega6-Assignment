import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import resSender from "../utils/resSender.js";

export const addCommentToBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { message } = req.body;
        const userId = req.user.id;

        if(!blogId){
            return resSender(res, 401, false, 'Blog id is required')
        }

        if(!message){
            return resSender(res, 401, false, 'message is required')
        }

        // Create a new comment
        const newComment = await Comment.create({
        user_id: userId,
        message,
        });

        // Add comment to the blog
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { $push: { comments: newComment._id } },
            { new: true }
        ).populate("comments");

        return resSender(res, 200, true, "Comment added successfully");
    } catch (err) {
        console.error("Error while creating comments error:", err.message);
        return resSender(res, 500, false, err.message);
    }
};
