"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserDetails, UserFriends } from "@/data/details/interfaces/intefaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareMore } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FriendSearch from "./ui/SearchFriends";

const FormSchema = z.object({
  email: z.string().min(1, "Please enter a name"),
});

type AutocompleteFormData = z.infer<typeof FormSchema>;

type Props = {
  user: UserFriends;
};

const AddChat = (props: Props) => {
  const router = useRouter();
  const form = useForm<AutocompleteFormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: AutocompleteFormData) => {
    await fetch(`/api/user/details?email=${data.email}`)
      .then((res) => res.json())
      .then((res: UserDetails) => {
        router.push(`/conversations/` + res._id);
      });
    form.reset();
  };

  return (
    <>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size={"icon"} variant={"outline"}>
                <MessageSquareMore />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogTitle>Make new chat with friend</DialogTitle>
          <DialogDescription>
            Enter username or email for chat to friend
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FriendSearch
                      value={field.value}
                      onChange={field.onChange}
                      data={props.user}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Chat</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddChat;
