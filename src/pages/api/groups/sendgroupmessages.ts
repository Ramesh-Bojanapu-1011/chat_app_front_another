import { connectDB } from "@/data/database/mangodb";
import GroupMessages from "@/data/models/GroupMessages";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectDB();
    const { senderId, receiverId, message, fileUrl, groupId } = req.body;

    const groupMessage = await GroupMessages.create({
      senderId,
      receiverId,
      groupId,
      message,
      fileUrl,
    });

    const lastMessage = await GroupMessages.findById(groupMessage._id).populate(
      "senderId receiverId",
      "username email image_url clerkId",
    );

    return res.status(200).json({ data: lastMessage });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
