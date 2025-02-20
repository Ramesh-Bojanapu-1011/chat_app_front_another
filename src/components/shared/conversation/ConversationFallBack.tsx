import { Card } from '@/components/ui/card';
import React from 'react';

type Props = {};

const ConversationFallBack = (props: Props) => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 items-center justify-center ">
      <h1 className="text-2xl font-semibold tracking-tight">
        Select a conversation
      </h1>
    </Card>
  );
};

export default ConversationFallBack;
