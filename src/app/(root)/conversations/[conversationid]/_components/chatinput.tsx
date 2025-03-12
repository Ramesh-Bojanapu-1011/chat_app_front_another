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
import { SendHorizonalIcon } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { z } from 'zod';

type Props = {
  userId: string;
  friendId: string;
  setNewMessage: (message: Message) => void; // Accept function as prop
};

const ChatInputFormSchema = z.object({
  message: z.string().min(1, { message: `This field is con't be empty` }),
  // file: z.file().optional(),
});

const Chatinput = (props: Props) => {
  const form = useForm({
    resolver: zodResolver(ChatInputFormSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    if (!data.message.trim()) return;
    const res = await fetch('/api/messages/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: props.userId,
        receiverId: props.friendId,
        message: data.message,
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
          className="flex w-full justify-between items-center "
        >
          <FormField
            control={form.control}
            name={'message'}
            render={({ field }) => {
              return (
                <>
                  <FormItem className="flex w-full ">
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
                        className="min-h-full w-full m-2 border-0 outline-none"
                        placeholder="enter message to send"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              );
            }}
          ></FormField>
          <Button disabled={false} type="submit">
            <SendHorizonalIcon />
          </Button>
        </form>
      </Form>
    </Card>
    // <div className="h-7 flex gap-3 w-full m-3">
    //   <Tooltip>
    //     <TooltipTrigger asChild>
    //       <Button>
    //         <FilePlus />
    //       </Button>
    //     </TooltipTrigger>
    //     <TooltipContent>select file</TooltipContent>
    //   </Tooltip>
    //   <Input placeholder="enter message to send " />
    //   <Button>
    //
    //   </Button>
    // </div>
  );
};

export default Chatinput;
