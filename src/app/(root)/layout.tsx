'use client';
import SidebarWraper from '@/components/shared/sidebar/SidebarWraper';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  const { user, isSignedIn, isLoaded } = useUser();

  // const socket = getSocket();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch('/api/auth/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          username: user.username,
          email: user.primaryEmailAddress?.emailAddress,
          fullName: user.fullName,
          image_url: user.imageUrl,
          fullname: user.fullName,
        }),
      });
    }
  }, [user, isSignedIn]);

  // useEffect(() => {
  //   if (user) {
  //     socket.on('connect', () => {
  //       console.log('Socket Connected:', socket.id);
  //     });
  //     socket.emit('userOnline', user.id); // Register user as online
  //     console.log('🔵 User Online:', user.id);
  //   }
  // }, [user, socket]);
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-screen gap-4 h-svh lg:flex-row">
      <SidebarWraper>{children}</SidebarWraper>
    </div>
  );
};

export default layout;
