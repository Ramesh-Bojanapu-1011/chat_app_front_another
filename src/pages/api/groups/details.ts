import { connectDB } from "@/data/database/mangodb";
import Groups from "@/data/models/Groups";
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
    const { groupid } = req.query;

    if (!groupid) {
      return res.status(400).json({ error: " Receiver ID are required" });
    }

    const userdetails = await Groups.findById(groupid).populate("users_in_grp");

    return res.status(200).json(userdetails);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
