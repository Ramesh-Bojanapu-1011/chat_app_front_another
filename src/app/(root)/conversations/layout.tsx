import ItemList from '@/components/shared/team-list/ItemList';
import React from 'react';

type Props = React.PropsWithChildren<{}>;

const Conversationslayout = ({ children }: Props) => {
  return (
    <>
      <ItemList title={'Conversations'}>Conversations</ItemList>
      {children}
    </>
  );
};

export default Conversationslayout;
