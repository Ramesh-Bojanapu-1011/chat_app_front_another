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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserFriends } from "@/data/details/interfaces/intefaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareMore, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import React from "react";

const FormSchema = z.object({
  friends: z
    .array(
      z.object({
        id: z.string(),
        value: z.string(),
        label: z.string(),
        image: z.string(),
      }),
    )
    .min(1, { message: "Select at least one friend" }),
  name: z.string().min(1, "enter Grp name  "),
  file: z.instanceof(File).optional(),
});

type AutocompleteFormData = z.infer<typeof FormSchema>;

type Props = {
  user: UserFriends;
};

const AddGroup = (props: Props) => {
  const friendOptions = props.user.friends.map((friend) => {
    return {
      id: friend._id,
      value: friend.email,
      label: friend.fullName,
      image: friend.image_url,
    };
  });

  const router = useRouter();
  const form = useForm<AutocompleteFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", friends: [], file: undefined }, // ✅ Always provide an explicit default value
  });

  const onSubmit = async (data: AutocompleteFormData) => {
    console.log(data);
    const file = data.file;
    const friends = data.friends.map((friend) => friend.id);
    friends.push(props.user._id);
    const groupName = data.name;
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      const response = await fetch(
        `/api/uploadfile?senderId=${
          props.user._id
        }&receiverId=${"Group-Details"}&type=${"Grp-profile"}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const fileUrl = await response.json();

      const res = await fetch("/api/groups/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createrId: props.user._id,
          groupName,
          friends,
          fileUrl: fileUrl.fileUrl,
        }),
      });

      const NewMessageDetails = await res.json();
      console.log(NewMessageDetails);
    } else {
      const res = await fetch("/api/groups/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          friends,
          fileUrl: undefined,
        }),
      });
      // const NewMessageDetails = await res.json();
    }
    form.reset({
      friends: [],
      name: "",
      file: undefined,
    });
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
          <TooltipContent>New Group</TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogTitle>Make new Gropu with friends</DialogTitle>
          <DialogDescription>Fill the fields to create group</DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="friends"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Select Friends *</FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="friends"
                          render={({ field }) => (
                            <>
                              <Select
                                {...field}
                                options={friendOptions}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Select friends"
                                onChange={(selected) =>
                                  field.onChange(selected)
                                }
                                components={{
                                  Option: (props) => {
                                    const { data, innerRef, innerProps } =
                                      props;
                                    return (
                                      <div
                                        ref={innerRef}
                                        {...innerProps}
                                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                      >
                                        <img
                                          src={data.image}
                                          alt={data.label}
                                          className="w-6 h-6 rounded-full"
                                        />
                                        <span>{data.label}</span>
                                      </div>
                                    );
                                  }, // Custom styling for Options
                                  MultiValue: (props) => {
                                    const { data, removeProps } = props;

                                    return (
                                      <>
                                        <div className="flex items-center gap-2 py-1 pl-2 bg-gray-200 rounded-full">
                                          <img
                                            src={data.image}
                                            alt={data.label}
                                            className="w-5 h-5 rounded-full"
                                          />
                                          <span className="text-sm ">
                                            {data.label}
                                          </span>
                                          <Button
                                            {...(removeProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                                            variant={"destructive"}
                                            size={"icon"}
                                            className="w-5 h-5"
                                            type="button"
                                          >
                                            ✕
                                          </Button>
                                        </div>
                                      </>
                                    );
                                  },
                                }}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
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

export default AddGroup;
