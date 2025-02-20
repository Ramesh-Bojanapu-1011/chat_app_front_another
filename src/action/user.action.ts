'use server';

import { connectDB } from '@/data/database/mangodb';
import User from '@/data/models/User';

export async function userCreated(evt: any) {
  try {
    await connectDB();

    const newuser = await User.create(evt);
    console.log('User created:', newuser);
    return JSON.parse(JSON.stringify(newuser));
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
  }
}
