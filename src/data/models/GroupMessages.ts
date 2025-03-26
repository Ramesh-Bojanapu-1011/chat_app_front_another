import mongoose from "mongoose";

// Message schema with ObjectId references
const GroupMessagesSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    message: { type: String },
    fileUrl: { type: String, default: null },
    isRead: { type: Boolean, default: false },
    read_byuser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.GroupMessages ||
  mongoose.model("GroupMessages", GroupMessagesSchema);
