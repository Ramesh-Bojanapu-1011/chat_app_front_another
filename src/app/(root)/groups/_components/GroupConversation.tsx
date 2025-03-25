"use client";
import ItemList from "@/components/shared/team-list/ItemList";
import { default_UserFriends_values } from "@/data/details/default_values/default_values";
import { UserFriends } from "@/data/details/interfaces/intefaces";
import { useUser } from "@clerk/nextjs";
import React from "react";
import AddGroup from "./AddGroup";

type Props = {};

const GroupConversation = (props: Props) => {
  const { user } = useUser();

  const [userDetails, setUserDetails] = React.useState<UserFriends>(
    default_UserFriends_values,
  );

  React.useEffect(() => {
    fetch(`/api/user/details?userId=${user?.id}`)
      .then((res) => res.json())
      .then(setUserDetails);
  }, [user]);

  return (
    <ItemList
      title={"Groups"}
      action={<AddGroup user={userDetails} />}
    ></ItemList>
  );
};

export default GroupConversation;
