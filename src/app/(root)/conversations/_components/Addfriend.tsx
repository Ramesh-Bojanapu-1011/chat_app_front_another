'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import FriendSearch from './ui/SearchFriends';
import { UserFriends } from '@/data/interfaces/intefaces';

const FormSchema = z.object({
  name: z.string().min(1, 'Please select a framework'),
});

type AutocompleteFormData = z.infer<typeof FormSchema>;

type Props = {
  user: UserFriends;
};

const Addfriend = (props: Props) => {
  const form = useForm<AutocompleteFormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: AutocompleteFormData) => {
    console.log('HEY', data);
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div>
                <FormLabel>Enter name for chat to friend</FormLabel>
              </div>
              <FriendSearch
                value={field.value}
                onChange={field.onChange}
                data={props.user}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Addfriend;
