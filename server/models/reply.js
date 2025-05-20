import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
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
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Reply", replySchema);
