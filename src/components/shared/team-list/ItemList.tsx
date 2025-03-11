'use client';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';
import useCoversation from '../../../../hooks/useCoversation';

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ children, title, action }: Props) => {
  const { isActive } = useCoversation();
  return (
    <Card
      className={cn('hidden flex-col   w-full lg:flex-none lg:w-80 p-2', {
        flex: isActive,
        'lg:flex': !isActive,
      })}
    >
      <div className="mb-4 flex  flex-row justify-between">
        <h1 className="text-2xl font-semibold  tracking-tight">{title}</h1>
        {action ? action : null}
      </div>
      <div className="w-full overflow-y-auto  h-full flex flex-col justify-start items-center  gap-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
