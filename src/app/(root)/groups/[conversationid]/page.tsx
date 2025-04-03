"use client";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { Card } from "@/components/ui/card";
import { default_Group_detals } from "@/data/details/default_values/default_values";
import { GroupDetails } from "@/data/details/interfaces/intefaces";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import useCoversation from "../../../../../hooks/useCoversation";
import Chatbox from "./_components/Chatbox";
import Hedder from "./_components/Hedder";
// import Chatbox from "./_components/chatbox";
// import Chatinput from "./_components/Chatbox";

const ConversationPerId = () => {
  const { user } = useUser();
  const { conversationId } = useCoversation();
  const [friendDetails, setFriendDetails] =
    useState<GroupDetails>(default_Group_detals);

  React.useEffect(() => {
    const FriendDetails = () =>
      fetch(`/api/groups/details?groupid=${conversationId}`)
        .then((res) => res.json())
        .then((data) => {
          setFriendDetails(data);
        });

    FriendDetails();
  }, [conversationId]);

  return (
    <>
      <ConversationContainer>
        {conversationId && user && (
          <Card className="flex flex-col items-center justify-between h-full p-2">
            <Hedder
              Groupid={
                Array.isArray(conversationId)
                  ? conversationId[0]
                  : conversationId
              }
            />
            <Chatbox
              userId={user.publicMetadata.clerkId as string}
              conversationId={
                Array.isArray(conversationId)
                  ? conversationId[0]
                  : conversationId
              }
              groupdetails={friendDetails}
            />
          </Card>
        )}
      </ConversationContainer>
    </>
  );
};
export default ConversationPerId;
