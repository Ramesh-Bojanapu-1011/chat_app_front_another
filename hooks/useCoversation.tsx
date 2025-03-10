import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useCoversation = () => {
  const params = useParams();

  const conversationId = useMemo(
    () => params?.conversationid || ('' as string),
    [params?.conversationid]
  );

  const isActive = useMemo(() => !conversationId, [conversationId]);

  return { conversationId, isActive };
};

export default useCoversation;
