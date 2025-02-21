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
    const { clerkId, email, fullName, image_url } = req.body as {
      clerkId: string;
      email: string;
      fullName?: string;
      image_url?: string;
    };

    // Check if user already exists
    let user = await User.findOne({ clerkId });

    if (!user) {
      // Save new user
      user = new User({ clerkId, email, fullName, image_url });
      await user.save();
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user' });
  }
}
