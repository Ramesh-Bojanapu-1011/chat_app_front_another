import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { Check, User, X } from 'lucide-react';
import React from 'react';

type Props = {
  id: string;
  username: string;
  email: string;
  image_url: string;
  fullname: string;
};

const Request = (props: Props) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.clerkId;
  console.log(userId);
  const handleRequest = async (action: 'accept' | 'reject') => {
    await fetch('/api/friends/handleRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, friendId: props.id, action }),
    });
    window.location.reload();
  };
  console.log(props);
  return (
    <>
      <p>Friend Request</p>
      <Card className="w-full p-2 flex items-center justify-between flex-shrink gap-2">
        <div className="flex gap-1 truncate items-center">
          <Avatar>
            <AvatarImage src={props.image_url} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[160px]">
            <h2 className=" text-lg font-bold  ">{props.fullname}</h2>
            <p className="">{props.email}</p>
          </div>
          <div>
            <Button
              size={'icon'}
              variant={'default'}
              onClick={() => handleRequest('accept')}
            >
              <Check className="w-0 h-0" />
            </Button>
            <Button
              size={'icon'}
              variant={'destructive'}
              onClick={() => handleRequest('reject')}
            >
              <X className="w-0 h-0" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Request;
