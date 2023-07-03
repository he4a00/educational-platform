import React from "react";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-16 border-b-4 p-3 sticky">
      <div className="flex gap-7 items-center ">
        <Image
          src="https://img.freepik.com/free-vector/illustration-graduation-hat_53876-5920.jpg?w=826&t=st=1688346105~exp=1688346705~hmac=2860f1626f7ae2f184db11055661b87fc02d1dc128333664b2c35ce7b7bcd7b6"
          width={50}
          height={50}
          className="rounded-full"
          alt="logo"
        />
        <h3 className="text-bold text-2xl md:flex none">Englishy</h3>
      </div>
      <div className="flex gap-5">
        <Button>Sign In</Button>
      </div>
    </div>
  );
};

export default Navbar;
