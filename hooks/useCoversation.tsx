import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useCoversation = () => {
  const params = useParams();
  // const conversationId = params.conversationId;

  const conversationId = useMemo(
    () => params?.conversationid || ('' as string),
    [params?.conversationid]
  );
  // console.log(conversationId);
  const isActive = useMemo(() => !conversationId, [conversationId]);

  return { conversationId, isActive };
};

export default useCoversation;
