"use client";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import useCoversation from "../../../../../hooks/useCoversation";
import Hedder from "./_components/Hedder";
import Chatinput from "./_components/chatinput";
import Messages from "./_components/messages";
import { useState } from "react";
import { Message } from "@/data/details/interfaces/intefaces";
import React from "react";

const ConversationPerId = () => {
  const { user } = useUser();
  const { conversationId } = useCoversation();

  const [newMessage, setNewMessage] = React.useState<any>([]);

  return (
    <>
      <ConversationContainer>
        {conversationId && user && (
          <Card className="flex items-center justify-center size-full">
            {conversationId}
          </Card>
        )}
      </ConversationContainer>
    </>
  );
};
export default ConversationPerId;
