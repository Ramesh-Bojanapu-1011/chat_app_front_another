import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/data/interfaces/intefaces';
import { getSocket } from '@/data/utils/socket';
import { cn } from '@/lib/utils';
import { CheckCheck, User2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  userId: string;
  conversationId: string;
  newMessage: Message | undefined;
};

const Messages = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const socket = getSocket();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, props.newMessage]);

  useEffect(() => {
    messages.forEach((msg) => {
      if (!msg.isRead && msg.receiverId._id === props.userId) {
        console.log('📤 Sending Mark Read Event:', msg._id);
        socket.emit('markAsRead', {
          messageId: msg._id,
        });
      }
    });
  }, [messages]);
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      console.log('Received Message:', message);
      setMessages((prev) => [...prev, message[0]]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [props.userId]);
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(
        `/api/messages/get?senderId=${props.userId}&receiverId=${props.conversationId}`
      );
      const data = await res.json();

      setMessages(data.messages);
    };

    fetchMessages();
  }, [props.conversationId]);

  // useEffect(() => {
  //   // Listen for read receipts
  //   socket.on('messageRead', ({ messageId, isReadAt }) => {
  //     // console.log('✅ Message Read Event Received:', messageId);
  //     setMessages((prev) =>
  //       prev.map((msg) =>
  //         msg._id === messageId ? { ...msg, isRead: true, isReadAt } : msg
  //       )
  //     );
  //   });

  //   return () => {
  //     socket.off('messageRead');
  //   };
  // }, []);

  const formatTime = (timestamp: any) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <div className="w-full flex h-full  lg:px-11 overflow-y-auto">
      <div className=" w-full flex flex-col gap-3">
        {messages.map((message, index) => {
          const lastbyuser =
            messages[index + 1]?.senderId._id === messages[index].senderId._id;

          return (
            <div
              key={index}
              className={cn('flex items-end  ', {
                'justify-end': message.senderId._id == props.userId,
                'justify-start': message.senderId._id != props.userId,
              })}
            >
              <div
                className={cn('flex flex-col w-full mx-2', {
                  'order-1 items-end': message.senderId._id == props.userId,
                  'order-2 items-start': message.senderId._id != props.userId,
                })}
              >
                <div
                  className={cn('px-4 rounded-2xl max-w-[50%]  ', {
                    'bg-blue-500 text-white':
                      message.senderId._id == props.userId,
                    'bg-gray-200 text-gray-800':
                      message.senderId._id != props.userId,
                    'rounded-br-none':
                      message.senderId._id == props.userId && lastbyuser,
                    'rounded-bl-none':
                      message.senderId._id != props.userId && lastbyuser,
                  })}
                >
                  <p className="text-wrap break-words break-all whitespace-pre-wrap">
                    {message.message}
                  </p>
                  <p className="flex w-full justify-end">
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
              <Avatar
                className={cn(' relative w-8 h-8', {
                  'order-1': message.senderId._id == props.userId,
                  ' invisible': lastbyuser,
                })}
              >
                <AvatarImage src={message.senderId.image_url} />
                <AvatarFallback>
                  <User2Icon />
                </AvatarFallback>
              </Avatar>
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </div>
    </div>
  );
};

export default Messages;

// <div
// key={index}
// className={`flex   items-center  ${message.senderId._id === props.userId ? 'justify-end  ' : 'justify-start   '}`}
// >
// <div
//   className={`flex  max-w-[70%] w-fit flex-wrap p-4 rounded-lg ${message.senderId._id === props.userId ? ' bg-[#3ad340]' : ' bg-[#7484ac]'}  `}
// >
//   <p className=" break-all    ">{message.message}</p>

//   <div className="flex justify-end items-center gap-2  w-full">
//     <div>
//       {message.isRead == false ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width={15}
//           height={15}
//           viewBox="0 0 24 24"
//         >
//           <path
//             fill="none"
//             stroke="#fff"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.4}
//             d="M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16"
//           ></path>
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width={17}
//           height={17}
//           viewBox="0 0 24 24"
//         >
//           <path
//             fill="none"
//             stroke="#005eff"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16"
//           ></path>
//         </svg>
//       )}
//     </div>

//     <p className={``}>{formatTime(message.createdAt)}</p>
//   </div>
// </div>
// <div className="pl-2">
//   <Avatar
//     className={`
// ${lastbyuser && message.senderId._id == props.userId && 'invisible'}`}
//   >
//     <AvatarImage src={message.senderId.image_url} />
//     <AvatarFallback>
//       <User2Icon />
//     </AvatarFallback>
//   </Avatar>
// </div>
// </div>
