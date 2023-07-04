import { Button } from "@/components/ui/ui/button";
import Link from "next/link";
import React from "react";
interface ViewButtonProps {
  text: string;
  id: string;
  disabled: boolean;
}

const ViewButton = ({ text, id, disabled }: ViewButtonProps) => {
  return (
    <Link href={`/course/${id}`}>
      <Button disabled={disabled}>{text}</Button>
    </Link>
  );
};

export default ViewButton;
