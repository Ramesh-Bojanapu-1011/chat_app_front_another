"use client";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import useCoversation from "../../../../../hooks/useCoversation";
import Hedder from "./_components/Hedder";

import Chatbox from "./_components/Chatbox";

const ConversationPerId = () => {
  const { user } = useUser();
  const { conversationId } = useCoversation();
  return (
    <>
      <ConversationContainer>
        {conversationId && user && (
          <Card className="flex flex-col items-center justify-between h-full p-2">
            <Hedder receiverId={conversationId} />

            <Chatbox
              userId={user.publicMetadata.clerkId as string}
              friendId={
                Array.isArray(conversationId)
                  ? conversationId[0]
                  : conversationId
              }
            />
          </Card>
        )}
      </ConversationContainer>
    </>
  );
};
export default ConversationPerId;
