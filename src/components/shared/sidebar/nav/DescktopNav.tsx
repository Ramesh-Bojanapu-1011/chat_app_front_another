'use client';
import React from 'react';
import useNaveigation from '../../../../../hooks/useNaveigation';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';

const DescktopNav = () => {
  const navItems = useNaveigation();

  return (
    <Card className="hidden lg:flex lg:justify-between lg:px-4 lg:py-4 lg:w-[60px] lg:flex-col lg:gap-4">
      <ul className="flex flex-col gap-4 items-center justify-center">
        {navItems.map((item, id) => (
          <li key={id}>
            <Link href={item.href}>
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <Button
                    size="icon"
                    variant={item.active ? 'default' : 'outline'}
                  >
                    {/* <button className=""></button> */}
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
      </ul>
      <div className="flex flex-col gap-4 items-center justify-center">
        <ModeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default DescktopNav;
