"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import UserDropDownMenu from "./UserDropDownMenu";
import SearchBar from "./SearchBar";
import { Modal, Button, Text, Loading } from "@nextui-org/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

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
      <div className="hidden md:block">
        <SearchBar className="" />
      </div>
      <div className="flex gap-5">
        {status === "loading" ? (
          <Button disabled auto bordered color="success" css={{ px: "$13" }}>
            <Loading type="points" color="currentColor" size="sm" />
          </Button>
        ) : session?.user ? (
          <UserDropDownMenu />
        ) : (
          <Button auto onPress={handler}>
            Sign In
          </Button>
        )}
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Welcome to {""}
              <Text b size={18}>
                Englishy
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <Button
                disabled
                auto
                bordered
                color="success"
                css={{ px: "$13" }}
              >
                <Loading type="points" color="currentColor" size="sm" />
              </Button>
            ) : (
              <Button onClick={loginWithGoogle} disabled={isLoading}>
                Continue With Google
              </Button>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
