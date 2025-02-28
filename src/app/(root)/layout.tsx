'use client';
import SidebarWraper from '@/components/shared/sidebar/SidebarWraper';
import { getSocket } from '@/data/utils/socket';
import { useUser } from '@clerk/nextjs';
import { Loader, LoaderPinwheelIcon } from 'lucide-react';

import React, { useEffect } from 'react';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  const { user, isSignedIn, isLoaded } = useUser();

  const socket = getSocket();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch('/api/auth/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          username: user.username,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          image_url: user.imageUrl,
          fullname: user.fullName,
        }),
      });

      socket.on('connect', () => {
        console.log('Socket Connected:', socket.id);
      });
      socket.emit('userOnline', user.id); // Register user as online
      console.log('🔵 User Online:', user.id);
    }
  }, [user, isSignedIn]);
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader seed={10} size={100} />
      </div>
    );
  }
  return (
    <div className="h-svh w-screen flex flex-col lg:flex-row gap-4">
      <SidebarWraper>{children}</SidebarWraper>
    </div>
  );
};

export default layout;
