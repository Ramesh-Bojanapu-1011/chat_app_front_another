export interface GroupMessages {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    email: string;
    image_url: string;
    clerkId: string;
    fullName: string;
  };
  groupId: string;
  receiverId: [
    {
      _id: string;
      username: string;
      clerkId: string;
      email: string;
      image_url: string;
      fullName: string;
    },
  ];
  message?: string;
  fileUrl?: string;
  isRead: boolean;
  read_byuser: [
    {
      _id: string;
      username: string;
      clerkId: string;
      email: string;
      image_url: string;
      fullName: string;
    },
  ];
  createdAt: string;
}

export interface Message {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    email: string;
    image_url: string;
    clerkId: string;
  };
  receiverId: {
    _id: string;
    username: string;
    clerkId: string;
    email: string;
    image_url: string;
  };
  message?: string;
  fileUrl?: string;
  isRead: boolean;
  isReadAt: Date;
  createdAt: string;
}

export interface UserDetails {
  _id: string;
  username: string;
  fullName: string;
  image_url: string;
  clerkId: string;
  email: string;
  grp_names: string[];
  friends: string[]; // Array of user IDs
  friendRequests: string[]; // Array of user IDs
  isOnline: boolean;
  lastSeen: string | null; // Can be a timestamp or null
  __v: number;
}
export interface UserFriends {
  _id: string;
  username: string;
  fullName: string;
  image_url: string;
  clerkId: string;
  email: string;
  friends: UserDetails[]; // Array of user IDs
  friendRequests: UserDetails[]; // Array of user IDs
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

export interface ChatMembers {
  _id: string;
  members: [
    {
      _id: string;
      username: string;
      fullName?: string;
      image_url: string;
      clerkId: string;
      email: string;
      friends: string[];
      friendRequests: string[];
      isOnline: boolean;
      lastSeen: string;
      __v: number;
      updatedAt: string;
    },
  ];
  lastMessage: {
    _id: string;
    senderId: string;
    receiverId: string;
    message?: string;
    fileUrl?: string;
    isRead: boolean;
    isReadAt: Date;
    createdAt: string;
  };
  createdAt: string;
  __v: number;
}

export interface GroupDetails {
  _id: string;
  grp_name: string;
  grp_created: string;
  users_in_grp: UserDetails[];
  grp_img_url: string;
}

export interface Groups {
  _id: string;
  grp_name: string;
  grp_created: string;
  users_in_grp: UserDetails[];
  grp_img_url: string;
}
