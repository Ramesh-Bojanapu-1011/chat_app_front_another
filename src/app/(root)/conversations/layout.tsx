import { Metadata } from "next";
import React from "react";
import Coversations from "./_components/Coversations";

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
      <Coversations />
      {children}
    </>
  );
};

export default Conversationslayout;
