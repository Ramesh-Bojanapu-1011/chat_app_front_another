import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Message } from '@/data/interfaces/intefaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { Paperclip, SendHorizonalIcon } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { z } from 'zod';

type Props = {
  userId: string;
  friendId: string;
  setNewMessage: (message: Message) => void; // Accept function as prop
};

const ChatInputFormSchema = z
  .object({
    message: z.string().optional(),
    file: z
      .instanceof(File)
      .optional()
      .refine((file) => file && file.size > 0, { message: 'File is required' })
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: 'File size must be under 5MB',
      }),
  })
  .refine((data) => data.message || data.file, {
    message: 'You must send either a message or a file.',
  });

const Chatinput = (props: Props) => {
  const form = useForm({
    resolver: zodResolver(ChatInputFormSchema),
    defaultValues: {
      message: '',
      file: undefined,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const file = data.file;
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `/api/upload?senderId=${props.userId}&receiverId=${props.friendId},`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const fileUrl = await response.json();
    console.log(fileUrl);

    const res = await fetch('/api/messages/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: props.userId,
        receiverId: props.friendId,
        message: data.message,
        fileUrl: data.file ? fileUrl.fileUrl : undefined,
      }),
    });
    form.reset();
    const NewMessageDetails = await res.json();
    props.setNewMessage(NewMessageDetails);
  };

  return (
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
                        if (e.key === 'Enter' && !e.shiftKey) {
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
                          document.getElementById('fileInput')?.click()
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

          <Button disabled={false} type="submit">
            <SendHorizonalIcon />
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default Chatinput;
