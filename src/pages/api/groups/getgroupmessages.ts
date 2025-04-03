import { connectDB } from "@/data/database/mangodb";
import GroupMessages from "@/data/models/GroupMessages";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectDB();
    const { GroupId } = req.query;
    // const user=await

    // Ensure senderId and receiverId are not arrays and are strings
    const GroupIdStr = Array.isArray(GroupId) ? GroupId[0] : GroupId;

    // Query messages and populate sender and receiver
    const messages = await GroupMessages.find({
      groupId: new mongoose.Types.ObjectId(GroupIdStr),
    })
      .populate("senderId", "username email image_url fullName") // Populate sender details
      .populate("receiverId", "username email image_url fullName") // Populate receiver details
      .populate("read_byuser", "username email image_url fullName")
      .sort({ createdAt: 1 });

    return res.status(200).json({ messages });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
