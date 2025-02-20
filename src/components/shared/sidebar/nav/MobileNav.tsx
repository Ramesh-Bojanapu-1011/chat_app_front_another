'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';
import useNaveigation from '../../../../../hooks/useNaveigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import useCoversation from '../../../../../hooks/useCoversation';
import { UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const navItems = useNaveigation();
  const { isActive } = useCoversation();
  return (
    <div
      className={cn('flex justify-center items-center', {
        hidden: !isActive,
      })}
    >
      <Card className="fixed bottom-3 w-[calc(100vw-22px)]  lg:hidden p-3">
        <ul className="flex flex-row justify-evenly gap-4">
          {navItems.map((item, id) => (
            <li key={id}>
              <Link href={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild={true}>
                    <Button
                      size="icon"
                      variant={item.active ? 'default' : 'outline'}
                    >
                      {item.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
          <li>
            <ModeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default MobileNav;
