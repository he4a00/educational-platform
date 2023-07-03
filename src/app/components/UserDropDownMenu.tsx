import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/ui/dropdown-menu";
import React from "react";
import UserAvatar from "./UserAvatar";
import { signOut, useSession } from "next-auth/react";

const UserDropDownMenu = () => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: session?.user.name || "",
            image: session?.user.image || "",
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session?.user ? (
          <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
        ) : null}
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          My Courses
        </DropdownMenuItem>
        {session?.user.type === "ADMIN" ? (
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
