import {
  GroupDetails,
  GroupMessages,
  RequestsObject,
  UserFriends,
} from "../interfaces/intefaces";

export const default_UserFriends_values: UserFriends = {
  _id: "",
  username: "",
  fullName: "",
  image_url: "",
  clerkId: "",
  email: "",
  friends: [], // Array of user IDs
  friendRequests: [], // Array of user IDs
  isOnline: false,
  lastSeen: null, // Can be a timestamp or null
  __v: 0,
};

export const default_RequestsObject_values: RequestsObject = {
  requests: [],
};

export const default_Group_detals: GroupDetails = {
  _id: "",
  grp_name: "",
  grp_created: "",
  users_in_grp: [],
  grp_img_url: "",
};

export const default_group_message_detals: GroupMessages = {
  _id: "",
  senderId: {
    _id: "",
    username: "",
    image_url: "",
    clerkId: "",
    email: "",
    fullName: "",
  },
  groupId: "",
  receiverId: [
    {
      _id: "",
      username: "",
      clerkId: "",
      email: "",
      image_url: "",
      fullName: "",
    },
  ],
  message: "",
  fileUrl: undefined,
  isRead: false,
  read_byuser: [
    {
      _id: "",
      username: "",
      clerkId: "",
      email: "",
      image_url: "",
      fullName: "",
    },
  ],
  createdAt: new Date().toISOString(),
};
