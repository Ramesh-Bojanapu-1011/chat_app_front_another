import { connectDB } from "@/data/database/mangodb";
import User from "@/data/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  await connectDB();
  const { userId, email } = req.query;

  const user =
    (await User.findOne({ clerkId: userId }).populate("friends")) ||
    (await User.findOne({ email: email }).populate("friends"));
  if (!user) return res.status(404).json({ error: "User not found." });

  res.status(200).json(user);
}
