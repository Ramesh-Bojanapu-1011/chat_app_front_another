import React from "react";

import { Metadata } from "next";

type Props = React.PropsWithChildren<{}>;

export const metadata: Metadata = {
  title: "Friends",
  description: "Friends",
  icons: {
    icon: "/chat-app-logo-icon.svg",
    apple: "/chat-app-logo-icon.svg",
    shortcut: "/chat-app-logo-icon.svg",
  },
  keywords: "chat app,chat application,chat,chat app,chat application,chat",
  authors: [{ name: "Ramesh" }],
};

const Frirndslayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Frirndslayout;
