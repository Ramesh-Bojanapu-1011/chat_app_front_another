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
      className={cn('hidden h-full w-full lg:flex-none lg:w-80 p-2', {
        block: isActive,
        'lg:block': !isActive,
      })}
    >
      <div className="mb-4 flex  flex-col justify-between">
        <h1 className="text-2xl font-semibold  tracking-tight">{title}</h1>
        {action ? action : null}
        <div className="w-full h-full flex flex-col justify-start items-center  gap-2">
          {children}
        </div>
      </div>
    </Card>
  );
};

export default ItemList;
