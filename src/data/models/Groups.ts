import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    grp_name: {
      type: String,
      required: true,
    },
    grp_created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users_in_grp: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    grp_img_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
