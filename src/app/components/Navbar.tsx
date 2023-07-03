"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/ui/button";
import UserDropDownMenu from "./UserDropDownMenu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const logout = async () => {
  //   setIsLoading(true);
  //   try {
  //     void signOut();
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center h-16 border-b-4 p-3 sticky container">
      <div className="flex gap-7 items-center ">
        <Link href="/">
          <Image
            src="https://img.freepik.com/free-vector/illustration-graduation-hat_53876-5920.jpg?w=826&t=st=1688346105~exp=1688346705~hmac=2860f1626f7ae2f184db11055661b87fc02d1dc128333664b2c35ce7b7bcd7b6"
            width={50}
            height={50}
            className="rounded-full"
            alt="logo"
          />
        </Link>
        <h3 className="text-bold text-2xl hidden md:flex">Englishy</h3>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="flex gap-5">
        {session?.user ? (
          <UserDropDownMenu />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
