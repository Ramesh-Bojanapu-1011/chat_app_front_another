import { connectDB } from '@/data/database/mangodb';
import User from '@/data/models/User';
import { clerkClient } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await connectDB();
    const { clerkId, email, fullName, image_url, username } = req.body as {
      clerkId: string;
      email: string;
      fullName?: string;
      image_url?: string;
      username?: string;
    };

    // Check if user already exists
    let user = await User.findOne({ clerkId });

    if (!user) {
      // Save new user
      user = new User({ username, clerkId, email, fullName, image_url });
      await user.save();
    }
    // Update existing user
    else {
      user.username = username;
      user.fullName = fullName;
      user.email = email;
      user.image_url = image_url;
      await user.save();
    }

    const client = await clerkClient();

    // Update user metadata
    await client.users.updateUser(clerkId, {
      publicMetadata: {
        clerkId: user._id,
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    // console.log('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user' });
  }
}
