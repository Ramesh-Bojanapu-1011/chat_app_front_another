import ConversationContainer from '@/components/shared/conversation/ConversationContainer';
import React from 'react';

type Props = {};

const ConversationPerId = (props: Props) => {
  return (
    <>
      <ConversationContainer>
        <div className="flex justify-center h-full w-full items-center">
          children
        </div>
      </ConversationContainer>
    </>
  );
};
export default ConversationPerId;
