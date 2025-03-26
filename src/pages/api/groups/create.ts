import { connectDB } from "@/data/database/mangodb";
import Conversation from "@/data/models/Conversation";
import Groups from "@/data/models/Groups";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { createrId, friends, groupName, fileUrl } = req.body;

    const newGroup = new Groups({
      grp_created: createrId,
      grp_name: groupName,
      users_in_grp: friends,
      grp_img_url: fileUrl,
    });
    await newGroup.save();

    // const friendsObjectId = friends.map(
    //   (frd_id: string) => new mongoose.Types.ObjectId(frd_id),
    // );

    return res.status(201).json({ message: "Message stored", newGroup });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
