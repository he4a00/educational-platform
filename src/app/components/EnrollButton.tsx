import { Button } from "@/components/ui/ui/button";
import React from "react";

interface EnrollButtonProps {
  className?: string;
}

//TODO: add the logic for the enroll course and make the lessons appear

const EnrollButton = ({ className }: EnrollButtonProps) => {
  const isSubscribed = true;
  return (
    <>
      {isSubscribed ? (
        <Button disabled={true} className={`w-full ${className}`}>
          Enrolled
        </Button>
      ) : (
        <Button className={`w-full ${className}`}>Enroll Course</Button>
      )}
    </>
  );
};

export default EnrollButton;
