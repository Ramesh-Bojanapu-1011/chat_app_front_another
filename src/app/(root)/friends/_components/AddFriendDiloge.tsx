'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
// import { UserDetails } from '@/data/interfaces/intefaces';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import UserSearch from './ui/UserSearch';
import { UserDetails } from '@/data/details/interfaces/intefaces';

const AddFriendFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: `This field is con't be empty` })
    .email('Invalid email'),
});

const AddFriendDiloge = (props: { currentUserId: string }) => {
  const [allUsers, setAllUsers] = useState<UserDetails[]>([]);
  const form = useForm({
    resolver: zodResolver(AddFriendFormSchema),
    defaultValues: {
      email: '',
    },
  });
  const { user } = useUser();

  useEffect(() => {
    fetch(`/api/user/allusers`)
      .then((res) => res.json())
      .then((res: UserDetails[]) => {
        console.log(res);
        setAllUsers(res);
      });
  }, []);

  const handleSubmit = async (data: FieldValues) => {
    try {
      const res = await fetch('/api/friends/sendRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          friendEmail: data.email,
          userId: user?.publicMetadata.clerkId,
        }),
      });
      const details = await res.json();

      if (res.ok) {
        toast.success('Friend request sent successfully');
      } else {
        toast.error(details.error);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }

    form.reset();
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <UserPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Add Friend</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogTitle>hello</DialogTitle>
        <DialogDescription>send Friend request</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => {
                return (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <UserSearch
                          value={field.value}
                          onChange={field.onChange}
                          data={allUsers}
                          currentUserId={props.currentUserId}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                );
              }}
            ></FormField>
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={false} type="submit">
                  Send
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDiloge;
