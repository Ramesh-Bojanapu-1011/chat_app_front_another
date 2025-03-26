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
    const { userid } = req.query;
    console.log(userid);

    const user = (await User.find({ clerkId: userid })).map((id) => id._id);

    const allgroups = await Groups.find({
      users_in_grp: user[0],
    });

     

    return res.status(200).json({
      allgroups,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
