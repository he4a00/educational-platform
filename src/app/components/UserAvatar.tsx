import { Avatar, AvatarFallback } from "@/components/ui/ui/Avatar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface UserProps {
  user: {
    name: string | null;
    image: string | null;
  };
}

const UserAvatar = ({ user, ...props }: UserProps) => {
  return (
    <div>
      <Avatar {...props}>
        <Image
          width={40}
          height={40}
          src={user.image || ""}
          alt="profile image"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
