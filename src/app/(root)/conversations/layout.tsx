'use client';
import ItemList from '@/components/shared/team-list/ItemList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ChatMembers } from '@/data/interfaces/intefaces';
import { useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = React.PropsWithChildren<{}>;

const Conversationslayout = ({ children }: Props) => {
  const { user } = useUser();

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch(`/api/conversations/${user?.publicMetadata.clerkId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConversations(data);
      });
  }, [user?.publicMetadata.clerkId]);

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
    <>
      <ItemList title={'Conversations'}>
        <div className=" flex  flex-col gap-2 ">
          {conversations && conversations.length === 0 && <p>No members</p>}

          {conversations.map((conv: ChatMembers) => (
            <Card key={conv._id} className=" w-full    ">
              {conv.members
                .filter((member) => member._id != user?.publicMetadata.clerkId) // Exclude the logged-in user
                .map((member) => (
                  <Link href={`/conversations/` + member._id} key={member._id}>
                    <div className="flex justify-between items-center p-2">
                      <div className="flex gap-2 items-center">
                        <Avatar>
                          <AvatarImage src={member.image_url} />
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col ">
                          <h2 className="text-lg text-nowrap font-semibold">
                            {member.fullName}
                          </h2>
                          <span className="text-sm text-muted-foreground">
                            {conv.lastMessage.message}
                          </span>
                        </div>
                      </div>
                      <div>
                        {member.isOnline ? (
                          <>
                            {' '}
                            <p className=" text-[#53d12d]  h-full w-full text-[15px] text-center">
                              Online
                            </p>
                          </>
                        ) : (
                          <span className="text-pretty text-muted-foreground ">
                            {formatLastSeen(member.lastSeen)}
                          </span>
                        )}
                      </div>
                    </div>{' '}
                  </Link>
                ))}
            </Card>
          ))}
        </div>
      </ItemList>
      {children}
    </>
  );
};

export default Conversationslayout;
