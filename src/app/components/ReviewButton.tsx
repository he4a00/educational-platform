import { Button } from "@/components/ui/ui/button";
import React from "react";
interface ReviewButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ReviewButton = ({ text, disabled, onClick }: ReviewButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ReviewButton;
