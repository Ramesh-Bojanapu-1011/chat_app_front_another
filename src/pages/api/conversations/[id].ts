import { connectDB } from '@/data/database/mangodb';
import Conversation from '@/data/models/Conversation';
import Message from '@/data/models/Message';
import User from '@/data/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { id } = req.query; // Conversation ID

  const user = await User.findOne({ clerkId: id });

  const lastMessage = await Message.find({
    $or: [{ senderId: user._id }, { receiverId: user._id }],
  }).sort({ createdAt: -1 }); // Sort by creation date in descending order

  if (req.method === 'GET') {
    const conversation = await Conversation.find({
      members: user._id,
      lastMessage: lastMessage,
    })
      .populate('members lastMessage')
      .sort({ createdAt: -1 });
    if (!conversation) throw new Error('Conversation not found');

    res.status(200).json(conversation);
  }
}
