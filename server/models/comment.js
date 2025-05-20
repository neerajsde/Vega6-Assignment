import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  replies:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
      required: true,
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", commentSchema);