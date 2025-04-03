import { getSocket } from "@/data/utils/socket";
import { useUser } from "@clerk/nextjs";
import { ContactRound, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const useNaveigation = () => {
  const pathname = usePathname();
  const socket = getSocket();

  const { user } = useUser();
  const [requestcount, setRequestCount] = useState<Number>();
  useEffect(() => {
    if (user) {
      const friendrequestcount = () =>
        fetch("/api/friends/friendrequestcount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        })
          .then((res) => res.json())
          .then((data) => {
            setRequestCount(data.requestcount);
          });
      friendrequestcount();
      socket.on("requestUpdate", () => {
        friendrequestcount();
      });
      return () => {
        socket.off("requestUpdate");
      };
    }
  }, [user]);

  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/conversations",
        icon: <MessageCircle />,
        active: pathname?.startsWith("/conversations"),
      },
      {
        name: "Friends",
        href: "/friends",
        icon: <ContactRound />,
        count: requestcount,
        active: pathname?.startsWith("/friends"),
      },
      {
        name: "Groups",
        href: "/groups",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <circle
                cx={12}
                cy={8}
                r={3}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
              ></circle>
              <path
                stroke="currentColor"
                strokeWidth={2}
                d="M15.268 8a2 2 0 1 1 3.464 2a2 2 0 0 1-3.464-2Zm-10 0a2 2 0 1 1 3.464 2a2 2 0 0 1-3.464-2Z"
              ></path>
              <path
                fill="currentColor"
                d="m16.882 18l-.98.197l.16.803h.82zm3.838-1.096l.943-.334zm-5.94-2.193l-.604-.797l-1.157.879l1.234.767zM19.868 17h-2.985v2h2.985zm-.09.238a.2.2 0 0 1-.005-.103a.2.2 0 0 1 .043-.097c.032-.04.059-.038.052-.038v2c1.146 0 2.274-1.08 1.796-2.43zM17 15c1.642 0 2.403 1.181 2.778 2.238l1.885-.668C21.198 15.259 19.948 13 17 13zm-1.614.507C15.77 15.215 16.282 15 17 15v-2c-1.162 0-2.097.362-2.824.914zm-1.133.053c1.039.646 1.474 1.772 1.648 2.637l1.96-.394c-.217-1.083-.824-2.867-2.552-3.942zm-5.033-.85l.527.85l1.234-.767l-1.157-.879zm-5.94 2.194l.942.334zM7.118 18v1h.819l.162-.803zM7 15c.718 0 1.23.215 1.614.507l1.21-1.593C9.097 13.362 8.162 13 7 13zm-2.778 2.238C4.597 16.181 5.358 15 7 15v-2c-2.948 0-4.198 2.259-4.663 3.57zM4.132 17c-.006 0 .02-.002.053.038a.2.2 0 0 1 .042.097a.2.2 0 0 1-.005.103l-1.885-.668C1.86 17.92 2.987 19 4.133 19zm2.986 0H4.133v2h2.985zm.98 1.197c.175-.865.61-1.991 1.65-2.637l-1.058-1.7c-1.728 1.075-2.335 2.86-2.553 3.942z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M12 14c3.572 0 4.592 2.551 4.883 4.009c.109.541-.33.991-.883.991H8c-.552 0-.992-.45-.883-.991C7.408 16.55 8.428 14 12 14Z"
              ></path>
            </g>
          </svg>
        ),

        active: pathname?.startsWith("/groups"),
      },
    ],
    [pathname, requestcount],
  );

  return paths;
};

export default useNaveigation;
