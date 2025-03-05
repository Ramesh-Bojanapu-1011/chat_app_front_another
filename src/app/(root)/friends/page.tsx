import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack';
import ItemList from '@/components/shared/team-list/ItemList';
import React from 'react';
import AddFriendDiloge from './_components/AddFriendDiloge';

const Friendspage = () => {
  return (
    <>
      <ItemList title={'Friends'} action={<AddFriendDiloge />}>
        Friends
      </ItemList>
      <ConversationFallBack />
    </>
  );
};

export default Friendspage;
