import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GroupMessages } from "@/data/details/interfaces/intefaces";
import { getSocket } from "@/data/utils/socket";
import { cn } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  userId: string;
  conversationId: string;
  newMessage: GroupMessages;
};

const Messages = (props: Props) => {
  const socket = getSocket();
  // console.log(props.newMessage);
  const [messages, setMessages] = useState<GroupMessages[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, props.newMessage]);

  useEffect(() => {
    socket.on("ReceiveGrpMessage", (message) => {
      setMessages((prev) => [...prev, message.data]);
    });
    return () => {
      socket.off("ReceiveGrpMessage");
    };
  }, [props.newMessage]);

  useEffect(() => {
    // console.log(messages);
    messages.forEach((msg) => {
      if (!msg.isRead && msg.receiverId.map((id) => id._id != props.userId)) {
        console.log("📤 Sending Mark Read Event:", msg._id);
        socket.emit("ReadGroupmessage", {
          messageId: msg._id,
          userId: props.userId,
        });
      }
    });
  }, [messages]);
  useEffect(() => {
    // Listen for read receipts
    socket.on("GrpMsgRead", ({ messageId, isRead }) => {
      // console.log('✅ Message Read Event Received:', messageId);

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: isRead } : msg,
        ),
      );
    });

    return () => {
      socket.off("GrpMsgRead");
    };
  }, [props.conversationId]);
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(
        `/api/groups/getgroupmessages?&GroupId=${props.conversationId}`,
      );
      const data = await res.json();

      setMessages(data.messages);
    };

    fetchMessages();
  }, [props.conversationId]);

  const formatTime = (timestamp: any) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default right-click menu
    setPosition({ x: event.pageX, y: event.pageY });
    setMenuVisible(true);
  };

  const handleClickOutside = () => {
    setMenuVisible(false);
  };

  return (
    <div
      className="flex w-full h-full overflow-y-auto lg:px-11"
      onClick={handleClickOutside}
    >
      <div className="flex flex-col w-full gap-3">
        {messages.map((message, index) => {
          const lastbyuser =
            messages[index + 1]?.senderId._id === messages[index].senderId._id;

          return (
            <div
              key={index}
              className={cn("flex items-end  ", {
                "justify-end": message.senderId._id == props.userId,
                "justify-start": message.senderId._id != props.userId,
              })}
            >
              <div
                className={cn("flex flex-col w-full mx-2", {
                  "order-1 items-end": message.senderId._id == props.userId,
                  "order-2 items-start": message.senderId._id != props.userId,
                })}
              >
                <div
                  onContextMenu={
                    message.senderId._id == props.userId
                      ? handleContextMenu
                      : undefined
                  }
                  className={cn("px-4 rounded-2xl py-3 max-w-[50%]  ", {
                    "bg-blue-500 text-white":
                      message.senderId._id == props.userId,
                    "bg-gray-200 text-gray-800":
                      message.senderId._id != props.userId,
                    "rounded-br-none":
                      message.senderId._id == props.userId && lastbyuser,
                    "rounded-bl-none":
                      message.senderId._id != props.userId && lastbyuser,
                  })}
                >
                  {message.fileUrl && (
                    <>
                      <Image
                        src={message.fileUrl}
                        alt={""}
                        className="rounded-lg "
                        width={200}
                        height={200}
                      />
                    </>
                  )}
                  <p className="break-words break-all whitespace-pre-wrap text-wrap">
                    {message.message}
                  </p>
                  <div className="flex gap-2 ">
                    <p
                      className={`flex justify-end w-full text-sm
                        ${
                          message.senderId._id != props.userId
                            ? "text-muted-foreground"
                            : " "
                        } `}
                    >
                      {formatTime(message.createdAt)}
                    </p>
                    {message.senderId._id == props.userId && (
                      <>
                        {message.isRead ? (
                          <Image
                            src="/seen.svg"
                            alt={""}
                            width={15}
                            height={15}
                          />
                        ) : (
                          <Image
                            src="/sent.svg"
                            alt={""}
                            width={15}
                            height={15}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {menuVisible && (
                <ul
                  className="absolute p-2 bg-white border shadow-lg rounded-xl border-slate-200"
                  style={{ top: position.y, left: position.x }}
                >
                  {message.read_byuser.map((user) => {
                    if (user._id == props.userId) return null;
                    return (
                      <li
                        key={user._id}
                        className="flex py-1 gap-1 max-w-[200px]"
                      >
                        <Image
                          src={user.image_url}
                          alt={""}
                          className="rounded-full"
                          width={15}
                          height={15}
                        />
                        <p className="text-sm text-muted-foreground">
                          {user.fullName}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}

              <Avatar
                className={cn(" relative w-8 h-8", {
                  "order-1": message.senderId._id == props.userId,
                  " invisible": lastbyuser,
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
