'use client';
import ConversationContainer from '@/components/shared/conversation/ConversationContainer';
import { Card } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import useCoversation from '../../../../../hooks/useCoversation';
import Hedder from './_components/Hedder';
import Chatinput from './_components/chatinput';
import Messages from './_components/messages';
import { useState } from 'react';
import { Message } from '@/data/interfaces/intefaces';

const ConversationPerId = () => {
  const { user } = useUser();
  const { conversationId } = useCoversation();

  const [newMessage, setNewMessage] = useState<Message>();

  return (
    <>
      <ConversationContainer>
        {conversationId && (
          <Card className="p-2  h-full  flex flex-col justify-between items-center">
            <Hedder receiverId={conversationId} />

            <Messages
              userId={user?.publicMetadata.clerkId as string}
              conversationId={
                Array.isArray(conversationId)
                  ? conversationId[0]
                  : conversationId
              }
              newMessage={newMessage}
            />

            <Chatinput
              userId={user?.publicMetadata.clerkId as string}
              friendId={
                Array.isArray(conversationId)
                  ? conversationId[0]
                  : conversationId
              }
              setNewMessage={setNewMessage}
            />
          </Card>
        )}
      </ConversationContainer>
    </>
  );
};
export default ConversationPerId;
