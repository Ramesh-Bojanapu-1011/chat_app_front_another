import { ContactRound, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

const useNaveigation = () => {
  const pathname = usePathname();

  const paths = useMemo(
    () => [
      {
        name: 'Conversations',
        href: '/conversations',
        icon: <MessageCircle />,
        active: pathname?.startsWith('/conversations'),
      },
      {
        name: 'Friends',
        href: '/friends',
        icon: <ContactRound />,

        active: pathname?.startsWith('/friends'),
      },
    ],
    [pathname]
  );

  return paths;
};

export default useNaveigation;
