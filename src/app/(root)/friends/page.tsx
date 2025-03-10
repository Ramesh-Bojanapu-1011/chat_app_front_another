'use client';
import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack';
import ItemList from '@/components/shared/team-list/ItemList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddFriendDiloge from './_components/AddFriendDiloge';
import Request from './_components/Request';
import Link from 'next/link';
import { ReceiverDetails, RequestsObject } from '@/data/interfaces/intefaces';

const Friendspage = () => {
  const { user } = useUser();
  const userId = user?.publicMetadata.clerkId;
  const [requests, setRequests] = useState<RequestsObject>();
  const [friends, setFriends] = useState<ReceiverDetails[]>([]);
  useEffect(() => {
    if (user) {
      fetch(`/api/friends/getRequests?userId=${user?.publicMetadata.clerkId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`/api/friends/${userId}`)
      .then((res) => res.json())
      .then(setFriends);
  }, [userId]);

  return (
    <>
      <ItemList title={'Friends'} action={<AddFriendDiloge />}>
        {requests ? (
          <>
            {requests.requests.length > 0 ? (
              <>
                {requests.requests.map((req, index) => {
                  return (
                    <Request
                      key={index}
                      id={req._id}
                      username={req.username}
                      email={req.email}
                      image_url={req.image_url}
                      fullname={req.fullName}
                    />
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {friends && (
          <>
            <p>Friends</p>
            {friends.map((user, index) => {
              return (
                <Card key={index} className=" flex w-full p-2 ">
                  <Link href={'/conversations/' + user._id}>
                    <div className="flex items-center ">
                      <Avatar>
                        <AvatarImage src={user.image_url} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline == true && (
                        <>
                          <div className=" absolute w-3 h-3 flex bg-primary border-2 border-white rounded-full"></div>
                        </>
                      )}

                      <div>
                        <h2 className="text-lg font-bold">{user.fullName}</h2>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {user.isOnline == true ? <>yes</> : <>no</>}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </>
        )}
      </ItemList>
      <ConversationFallBack />
    </>
  );
};

export default Friendspage;
