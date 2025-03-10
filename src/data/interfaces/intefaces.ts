export interface Message {
  _id: string;
  senderId: { _id: string; username: string; email: string; image_url: string };
  receiverId: {
    _id: string;
    username: string;
    email: string;
    image_url: string;
  };
  message?: string;
  fileUrl?: string;
  isRead: boolean;
  isReadAt: Date;
  createdAt: string;
}

export interface FriendDetails {
  _id: string;
  username: string;
  fullName: string;
  image_url: string;
  clerkId: string;
  email: string;
  friends: string[]; // Array of user IDs
  friendRequests: string[]; // Array of user IDs
  isOnline: boolean;
  lastSeen: string | null; // Can be a timestamp or null
  __v: number;
}

interface RequestData {
  _id: string;
  username: string;
  email: string;
  image_url: string;
  fullName: string;
}
export interface RequestsObject {
  requests: RequestData[];
}

export interface ReceiverDetails {
  _id: string;
  isOnline: boolean;
  lastSeen: Date;
  image_url: string;
  fullName: string;
}
