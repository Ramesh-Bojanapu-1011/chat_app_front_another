import { useUser } from '@clerk/nextjs';
import { ContactRound, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const useNaveigation = () => {
  const pathname = usePathname();

  const { user } = useUser();
  const [requestcount, setRequestCount] = useState<Number>();
  useEffect(() => {
    if (user) {
      fetch('/api/friends/friendrequestcount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setRequestCount(data.requestcount);
        });
    }
  }, [user]);

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
        count: requestcount,
        active: pathname?.startsWith('/friends'),
      },
    ],
    [pathname, requestcount]
  );

  return paths;
};

export default useNaveigation;
