'use client';
import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack';
import ItemList from '@/components/shared/team-list/ItemList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { default_RequestsObject_values } from '@/data/details/default_values/default_values';
import {
  ReceiverDetails,
  RequestsObject,
} from '@/data/details/interfaces/intefaces';
import { useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddFriendDiloge from './_components/AddFriendDiloge';
import Request from './_components/Request';
import { getSocket } from '@/data/utils/socket';

const Friendspage = () => {
  const socket = getSocket();
  const { user } = useUser();
  const [requests, setRequests] = useState<RequestsObject>(
    default_RequestsObject_values
  );
  const [friends, setFriends] = useState<ReceiverDetails[]>([]);
  useEffect(() => {
    const fetchRequests = () => {
      if (user) {
        const requests = () =>
          fetch(`/api/friends/getRequests?userId=${user.id}`, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((data) => {
              setRequests(data);
            });
        requests();
      }
    };
    socket.on('requestUpdate', () => {
      console.log('Request Updated');
      fetchRequests();
    });

    fetchRequests();

    return () => {
      socket.off('requestUpdate');
    };
  }, [user]);

  useEffect(() => {
    const fetchFriends = () => {
      fetch(`/api/friends/${user?.id}`)
        .then((res) => res.json())
        .then(setFriends);
    };
    socket.on('requestUpdate', () => {
      console.log('Request Updated');
      fetchFriends();
    });

    fetchFriends();
    return () => {
      socket.off('requestUpdate');
    };
  }, [user]);

  return (
    <>
      <ItemList
        title={'Friends'}
        action={<AddFriendDiloge currentUserId={user?.id as string} />}
      >
        {requests ? (
          <>
            {requests.requests.length > 0 ? (
              <>
                <p>Friend Request</p>
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
                <Card key={index} className="flex w-full p-2 ">
                  <Link href={'/conversations/' + user._id}>
                    <div className="flex items-center justify-between ">
                      <Avatar>
                        <AvatarImage src={user.image_url} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex">
                        <h2 className="text-lg font-bold">{user.fullName}</h2>
                      </div>
                      <div className="flex">
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
