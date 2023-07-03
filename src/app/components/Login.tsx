"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/ui/button";

const Login = () => {
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
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-y-3">
        <Image
          src="https://img.freepik.com/free-vector/illustration-graduation-hat_53876-5920.jpg?w=826&t=st=1688346105~exp=1688346705~hmac=2860f1626f7ae2f184db11055661b87fc02d1dc128333664b2c35ce7b7bcd7b6"
          width={80}
          height={80}
          className="rounded-full"
          alt="logo"
        />
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p>
          By continuing, you are setting up a Englishy account and agree to our
          User Agreement.
        </p>
        <p>To Access The Content of This Site Please Sign In First</p>
        <Button
          className="w-full"
          size="lg"
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
