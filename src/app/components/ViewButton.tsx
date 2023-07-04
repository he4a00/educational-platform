import { Button } from "@/components/ui/ui/button";
import Link from "next/link";
import React from "react";
interface ViewButtonProps {
  text: string;
  id: string;
}

const ViewButton = ({ text, id }: ViewButtonProps) => {
  return (
    <Link href={`/course/${id}`}>
      <Button>{text}</Button>
    </Link>
  );
};

export default ViewButton;
