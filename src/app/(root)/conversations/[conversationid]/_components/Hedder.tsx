import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FriendDetails } from '@/data/interfaces/intefaces';

import { MoveLeft, User, PhoneCall, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Props = {
  receiverId: any;
};

const Hedder = (props: Props) => {
  const [friendDetails, setFriendDetails] = useState<FriendDetails>();

  useEffect(() => {
    fetch(`/api/messages/receiverdetails?receiverId=${props.receiverId}`)
      .then((res) => res.json())
      .then((data) => {
        setFriendDetails(data);
      });
  }, [props.receiverId]);
  const formatLastSeen = (date: any) => {
    if (!date) return 'Unknown';
    const diff = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 60000
    ); // in minutes
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 24 * 60) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / (24 * 60))} days ago`;
  };
  return (
    <div className="flex justify-between w-full border-b-2 border-red-50">
      <div className="flex items-center  gap-2">
        <Button
          size={'icon'}
          variant={'outline'}
          className="lg:hidden"
          onClick={() => window.history.back()}
        >
          <MoveLeft />
        </Button>
        <Avatar>
          <AvatarImage src={friendDetails?.image_url} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-bold  ">{friendDetails?.fullName}</h2>
          <p className="text-gray-400 text-sm">
            {friendDetails?.isOnline ? (
              <>
                <span className="text-[#2de112]">Online</span>
              </>
            ) : (
              `Last seen ${formatLastSeen(friendDetails?.lastSeen)}`
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <PhoneCall />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Call</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <Video />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Video Call</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Hedder;
