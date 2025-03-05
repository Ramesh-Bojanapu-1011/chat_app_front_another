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

  const handleSubmit = (data: FieldValues) => {
    console.log(data);

    toast.success('Friend request sent');

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <UserPlus />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>hello</DialogTitle>
        <DialogDescription>send Friend request</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className=" space-y-8"
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
