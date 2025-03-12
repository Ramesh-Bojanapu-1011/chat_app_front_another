'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const AddFriendFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: `This field is con't be empty` })
    .email('Invalid email'),
});

const AddFriendDiloge = () => {
  const form = useForm({
    resolver: zodResolver(AddFriendFormSchema),
    defaultValues: {
      email: '',
    },
  });
  const { user } = useUser();

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
                        <Input
                          type="email"
                          // name="email"
                          placeholder="email....."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                );
              }}
            ></FormField>
            <DialogFooter>
              <Button disabled={false} type="submit">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDiloge;
