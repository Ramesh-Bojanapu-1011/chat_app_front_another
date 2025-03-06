import { connectDB } from '@/data/database/mangodb';
import User from '@/data/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await connectDB();
    const { user_id } = req.body as {
      user_id: string;
    };

    // Check if user already exists
    let user = await User.findOne({ clerkId: user_id });

    const requestcount = user.friendRequests.length;

    res.status(200).json({ requestcount });
  } catch (error) {
    // console.log('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user' });
  }
}
