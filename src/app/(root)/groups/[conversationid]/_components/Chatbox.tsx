import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { default_group_message_detals } from "@/data/details/default_values/default_values";
import {
  GroupDetails,
  GroupMessages,
} from "@/data/details/interfaces/intefaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, SendHorizonalIcon } from "lucide-react";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import Messages from "./messages";
import { getSocket } from "@/data/utils/socket";

type Props = {
  userId: string;
  groupdetails: GroupDetails;
  // friendId: string;
  conversationId: string;
};

const ChatInputFormSchema = z
  .object({
    message: z.string().optional(),
    file: z.instanceof(File).optional(),
  })
  .refine((data) => data.message || data.file, {
    message: "You must send either a message or a file.",
  });

const Chatbox = (props: Props) => {
  const socket = getSocket();
  const [newMessage, setNewMessage] = React.useState<GroupMessages>(
    default_group_message_detals,
  );

  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(ChatInputFormSchema),
    defaultValues: {
      message: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const file = data.file;
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
      const response = await fetch(
        `/api/uploadfile?senderId=${props.userId}&receiverId=${
          props.conversationId
        }&type=${"Group-chat"}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const fileUrl = await response.json();
      const res = await fetch("/api/groups/sendgroupmessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: props.userId,
          receiverId: props.groupdetails.users_in_grp,
          message: data.message,
          groupId: props.conversationId,
          fileUrl: fileUrl.fileUrl,
        }),
      });
      const NewMessageDetails = await res.json();
      socket.emit("SendGroupmessage", NewMessageDetails);
      setNewMessage(NewMessageDetails);
    } else {
      if (data.message.trim()) {
        const res = await fetch("/api/groups/sendgroupmessages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: props.userId,
            receiverId: props.groupdetails.users_in_grp,
            message: data.message,
            groupId: props.conversationId,
            fileUrl: undefined,
          }),
        });
        const NewMessageDetails = await res.json();
        socket.emit("SendGroupmessage", NewMessageDetails);
        setNewMessage(NewMessageDetails.data);
      }
    }

    form.reset();
    setLoading(false);
  };

  return (
    <>
      <Messages
        userId={props.userId}
        conversationId={props.conversationId}
        newMessage={newMessage}
      />
      <Card className="flex w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-between w-full "
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => {
                return (
                  <FormItem className="flex w-full">
                    <FormControl>
                      <TextareaAutosize
                        rows={1}
                        maxRows={3}
                        onKeyDown={async (e: any) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await onSubmit(form.getValues());
                          }
                        }}
                        className="w-full min-h-full m-2 border-0 outline-none"
                        placeholder="enter message to send"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                return (
                  <FormItem className="flex w-fit">
                    <FormControl>
                      <div>
                        <input
                          id="fileInput"
                          type="file"
                          className="hidden "
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                        <Button
                          type="button"
                          className="p-2"
                          onClick={() =>
                            document.getElementById("fileInput")?.click()
                          }
                        >
                          <Paperclip size={20} />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button disabled={loading} type="submit">
              <SendHorizonalIcon />
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default Chatbox;
