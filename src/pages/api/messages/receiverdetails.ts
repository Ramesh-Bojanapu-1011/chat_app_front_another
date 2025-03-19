import { connectDB } from "@/data/database/mangodb";
import User from "@/data/models/User";
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
    const { receiverId } = req.query;

    if (!receiverId) {
      return res.status(400).json({ error: " Receiver ID are required" });
    }

    const userdetails = await User.findById(receiverId);

    return res.status(200).json(userdetails);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
