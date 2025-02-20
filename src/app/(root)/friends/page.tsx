import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack';
import ItemList from '@/components/shared/team-list/ItemList';
import React from 'react';

const Friendspage = () => {
  return (
    <>
      <ItemList title={'Friends'}>Friends</ItemList>
      <ConversationFallBack />
    </>
  );
};

export default Friendspage;
