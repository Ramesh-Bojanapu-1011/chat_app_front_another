'use client';
import SidebarWraper from '@/components/shared/sidebar/SidebarWraper';
import { useUser } from '@clerk/nextjs';

import React, { useEffect } from 'react';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  const { user, isSignedIn } = useUser();
  // const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        }),
      });
      // .then(() => router.push('/')); // Redirect after successful registration
    }
  }, [user, isSignedIn]);
  return (
    <div className="h-svh w-screen flex flex-col lg:flex-row gap-4">
      <SidebarWraper>{children}</SidebarWraper>
    </div>
  );
};

export default layout;
