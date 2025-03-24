import React from "react";
// import Coversations from "./_components/Coversations";
import { Metadata } from "next";
import GroupConversation from "./_components/GroupConversation";

type Props = React.PropsWithChildren<{}>;

export const metadata: Metadata = {
  title: "Conversations",
  description: "Conversations",
  icons: {
    icon: "/chat-app-logo-icon.svg",
    apple: "/chat-app-logo-icon.svg",
    shortcut: "/chat-app-logo-icon.svg",
  },
  keywords: "chat app,chat application,chat,chat app,chat application,chat",
  authors: [{ name: "Ramesh" }],
};

const Conversationslayout = ({ children }: Props) => {
  return (
    <>
      <GroupConversation />
      {children}
    </>
  );
};

export default Conversationslayout;
