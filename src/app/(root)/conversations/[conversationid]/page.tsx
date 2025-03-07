'use client';
import ConversationContainer from '@/components/shared/conversation/ConversationContainer';
import { Card } from '@/components/ui/card';
import { getSocket } from '@/data/utils/socket';
import { useUser } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';
import useCoversation from '../../../../../hooks/useCoversation';
import Hedder from './_components/Hedder';
import Chatinput from './_components/chatinput';

type Props = {};

interface Message {
  _id: string;
  senderId: { _id: string; username: string; email: string };
  receiverId: { _id: string; username: string; email: string };
  message?: string;
  fileUrl?: string;
  isRead: boolean;
  isReadAt: Date;
  createdAt: string;
}
const ConversationPerId = (props: Props) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.clerkId;
  const { conversationId } = useCoversation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const socket = getSocket();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(
        `/api/messages/get?senderId=${userId}&receiverId=${conversationId}`
      );
      const data = await res.json();
      // console.log(data.messages);
      setMessages(data.messages);
    };

    // console.log(friend);

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    // Listen for read receipts
    socket.on('messageRead', ({ messageId, isReadAt }) => {
      // console.log('✅ Message Read Event Received:', messageId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: true, isReadAt } : msg
        )
      );
    });

    return () => {
      socket.off('messageRead');
    };
  }, []);

  useEffect(() => {
    messages.forEach((msg) => {
      if (!msg.isRead && msg.receiverId._id === userId) {
        // console.log('📤 Sending Mark Read Event:', msg._id);
        socket.emit('markAsRead', {
          messageId: msg._id,
        });
      }
    });
  }, [messages, newMessage]);
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      // console.log('Received Message:', message);
      setMessages((prev) => [...prev, message[0]]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (file || newMessage) {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const upload = await fetch(
          `/api/upload?senderId=${userId}&receiverId=${conversationId},`,
          {
            method: 'POST',
            body: formData,
          }
        );
        // console.log(formData);
        const uploadResponse = await upload.json();
        const fileUrl = uploadResponse.fileUrl;
        setFileUrl(fileUrl);
        // console.log('fileUrl', fileUrl);
        const res = await fetch('/api/messages/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId: conversationId,
            message: newMessage,
            fileUrl: fileUrl,
          }),
        });
        const data = await res.json();
        // console.log('📤 Sending Message:', data.data);
        socket.emit('sendMessage', data.data[0]);
        setMessages((prev) => [...prev, data.data[0]]);
      } else {
        // console.log('fileUrl', fileUrl);
        const res = await fetch('/api/messages/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId: conversationId,
            message: newMessage,
            fileUrl: fileUrl,
          }),
        });
        const data = await res.json();
        // console.log('📤 Sending Message:', data.data);
        socket.emit('sendMessage', data.data[0]);
        setMessages((prev) => [...prev, data.data[0]]);
      }
    }
    setNewMessage('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: any) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <ConversationContainer>
        <Card className=" p-2  h-full  flex flex-col justify-between items-center">
          <Hedder receiverId={conversationId} />

          <div className="w-full px-11 overflow-y-auto "></div>
          <Chatinput
            userId={user?.publicMetadata.clerkId as string}
            friendId={
              Array.isArray(conversationId) ? conversationId[0] : conversationId
            }
          />
        </Card>
      </ConversationContainer>
    </>
  );
};
export default ConversationPerId;
