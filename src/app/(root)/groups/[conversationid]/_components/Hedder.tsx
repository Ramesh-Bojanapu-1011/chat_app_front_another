import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Groups } from "@/data/details/interfaces/intefaces";
import Image from "next/image";

import { InfoIcon, MoveLeft, User } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  Groupid: string;
};

const Hedder = (props: Props) => {
  // const socket = getSocket();
  const [groupDetails, setGroupDetails] = useState<Groups>();

  useEffect(() => {
    const GroupDetails = () =>
      fetch(`/api/groups/details?groupid=${props.Groupid}`)
        .then((res) => res.json())
        .then((data) => {
          setGroupDetails(data);
        });

    GroupDetails();
  }, [props.Groupid]);

  return (
    <div className="flex justify-between w-[95%] border-b-2 border-red-50">
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          variant={"outline"}
          className="lg:hidden"
          onClick={() => window.history.back()}
        >
          <MoveLeft />
        </Button>
        <Avatar>
          <AvatarImage src={groupDetails?.grp_img_url} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-bold ">{groupDetails?.grp_name}</h2>
          <p className="text-sm text-gray-400">
            {/* {friendDetails?.isOnline ? (
              <>
                <span className="text-[#2de112]">Online</span>
              </>
            ) : (
              `Last seen ${formatLastSeen(friendDetails?.lastSeen)}`
            )} */}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button size={"icon"} variant={"outline"}>
                  <InfoIcon />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>

            <TooltipContent>Info</TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <Card>
              {groupDetails && (
                <>
                  <CardHeader>
                    <CardTitle>Group Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={groupDetails.grp_img_url}
                      alt={""}
                      className="m-2 rounded-2xl"
                      width={150}
                      height={150}
                    />
                    <div className="flex w-full">
                      <ul>
                        <li className="flex items-center gap-2">
                          <p className="font-semibold text-ls">Group Name</p>
                          <p className="">{groupDetails.grp_name}</p>
                        </li>

                        <li>
                          <p className="font-semibold text-ls">Members</p>
                          {groupDetails.users_in_grp &&
                            groupDetails.users_in_grp.map((user, index) => (
                              <div key={index}>
                                <div className="flex items-center gap-2 py-1">
                                  <Avatar>
                                    <AvatarImage src={user.image_url} />
                                    <AvatarFallback>
                                      <User />
                                    </AvatarFallback>
                                  </Avatar>
                                  <p>{user.fullName}</p>

                                  {groupDetails.grp_created == user._id && (
                                    <p className="text-sm text-gray-400">
                                      (Admin)
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </DialogContent>
        </Dialog>

        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <Video />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Video Call</TooltipContent>
        </Tooltip> */}
      </div>
    </div>
  );
};

export default Hedder;
