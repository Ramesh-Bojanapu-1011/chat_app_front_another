"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import useCoversation from "../../../../../hooks/useCoversation";
import useNaveigation from "../../../../../hooks/useNaveigation";

const MobileNav = () => {
  const navItems = useNaveigation();
  const { isActive } = useCoversation();
  return (
    <div
      className={cn("flex justify-center items-center", {
        hidden: !isActive,
      })}
    >
      <Card className="fixed bottom-3 w-[calc(100vw-22px)]  lg:hidden p-3">
        <ul className="flex flex-row gap-4 justify-evenly">
          {navItems.map((item, id) => (
            <li key={id}>
              <Link href={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild={true}>
                    <Button
                      size="icon"
                      variant={item.active ? "default" : "outline"}
                    >
                      {item.icon}
                      {item.count !== undefined && Number(item.count) > 0 && (
                        <>
                          <Badge className="absolute justify-center w-4 h-4 top-1 ">
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
