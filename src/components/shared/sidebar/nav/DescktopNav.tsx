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
import { Badge } from '@/components/ui/badge';

const DescktopNav = () => {
  const navItems = useNaveigation();

  return (
    <Card className="hidden lg:flex lg:justify-between lg:px-4 lg:py-4 lg:w-[60px] lg:flex-col lg:gap-4">
      <ul className="flex flex-col items-center justify-center gap-4">
        {navItems.map((item, id) => {
          return (
            <li key={id}>
              <Link href={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant={item.active ? 'default' : 'outline'}
                    >
                      {item.icon}
                      {item.count !== undefined && Number(item.count) > 0 && (
                        <>
                          <Badge className="absolute w-4 h-4 justify-center left-[50px] top-[58px]">
                            {String(item.count)}
                          </Badge>
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col items-center justify-center gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default DescktopNav;
