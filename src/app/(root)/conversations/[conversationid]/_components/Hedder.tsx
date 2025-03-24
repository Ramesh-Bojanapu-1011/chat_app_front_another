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
import { UserDetails } from "@/data/details/interfaces/intefaces";
import { getSocket } from "@/data/utils/socket";
import Image from "next/image";

import { InfoIcon, MoveLeft, User } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  receiverId: any;
};

const Hedder = (props: Props) => {
  const socket = getSocket();
  const [friendDetails, setFriendDetails] = useState<UserDetails>();

  useEffect(() => {
    const FriendDetails = () =>
      fetch(`/api/messages/receiverdetails?receiverId=${props.receiverId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setFriendDetails(data);
        });
    socket.on("userStatusUpdate", () => {
      FriendDetails();
    });
    FriendDetails();
    return () => {
      socket.off("userStatusUpdate");
    };
  }, [props.receiverId]);
  const formatLastSeen = (date: any) => {
    if (!date) return "Unknown";
    const diff = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 60000,
    ); // in minutes
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 24 * 60) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / (24 * 60))} days ago`;
  };
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
          <AvatarImage src={friendDetails?.image_url} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-bold ">{friendDetails?.fullName}</h2>
          <p className="text-sm text-gray-400">
            {friendDetails?.isOnline ? (
              <>
                <span className="text-[#2de112]">Online</span>
              </>
            ) : (
              `Last seen ${formatLastSeen(friendDetails?.lastSeen)}`
            )}
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
            <DialogTitle>Profile</DialogTitle>
            <Card>
              {friendDetails && (
                <>
                  <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={friendDetails.image_url}
                      alt={""}
                      className="flex items-center justify-center rounded-full"
                      width={150}
                      height={150}
                    />
                    <div className="flex flex-col justify-center w-full">
                      <table>
                        <tbody>
                          <tr>
                            <td>Full name:</td>
                            <td>{friendDetails.fullName}</td>
                          </tr>
                          <tr>
                            <td>Username:</td>
                            <td>{friendDetails.username}</td>
                          </tr>

                          <tr>
                            <td>Email:</td>
                            <td>{friendDetails.email}</td>
                          </tr>
                        </tbody>
                      </table>
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
