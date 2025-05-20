import Comment from "../models/comment.js";
import Reply from "../models/reply.js";
import resSender from "../utils/resSender.js";

export const commentReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    if (!commentId) {
      return resSender(res, 401, false, "Comment id is required");
    }

    if (!message) {
      return resSender(res, 401, false, "message is required");
    }

    // Create a new reply
    const newReply = await Reply.create({
      user_id: userId,
      message,
    });

    // Push the reply to the comment's replies array
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: newReply._id } },
      { new: true }
    ).populate({
      path: "replies",
      populate: {
        path: "user_id",
        select: "name email",
      },
    });

    if (!updatedComment) {
        return resSender(res, 404, false, "Comment not found");
    }

    return resSender(res, 200, true, "Reply added successfully", updatedComment);

  } catch (error) {
    console.log("Error While creating reply on comment message: ", error.message)
    return resSender(res, 500, false, "Internal server error", {error: error.message});
  }
};
