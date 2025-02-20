'use server';

import { connectDB } from '@/data/database/mangodb';
import User from '@/data/models/User';

export async function userCreated(user: any) {
  try {
    await connectDB();

    const newuser = await User.create({
      clerkId: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email_addresses[0]?.email_address,
      image_url: user.image_url,
    });
    // console.log('User created:', newuser);           
    return JSON.parse(JSON.stringify(newuser));
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
  }
}
