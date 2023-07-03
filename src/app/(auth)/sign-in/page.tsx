import Login from "@/app/components/Login";
import React from "react";

export const metadata = {
  title: "Login Page",
  description: "Online Platform For Students",
};

const LoginPage = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
      <Login />
    </div>
  );
};

export default LoginPage;
