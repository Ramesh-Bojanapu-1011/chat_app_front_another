import { connectDB } from "@/data/database/mangodb";
import User from "@/data/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  await connectDB();

  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user = await User.find({ clerkId: userId });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  // Get all users without friends and friend requests of login user
  const users = await User.find({
    _id: { $ne: user[0]._id },
    friends: { $ne: user[0]._id },
    friendRequests: { $ne: user[0]._id },
  });

  res.status(200).json(users);
}
