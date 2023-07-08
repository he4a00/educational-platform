import { Button } from "@/components/ui/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { CreateSavedPayload } from "../lib/validators/saved";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/ui/use-toast";
import { useParams } from "next/navigation";

interface AddToFavButtonProps {
  text: string;
  courseId: string;
}

const AddToFavButton = ({ text, courseId }: AddToFavButtonProps) => {
  const params = useParams();
  const { toast } = useToast();
  const { mutate: savePost, isLoading: savedLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSavedPayload = {
        courseId: courseId,
      };
      const { data } = await axios.post("/api/saved/", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: "Already Saved",
            description: "You have already saved this course",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          toast({
            title: "No Session Founded",
            description:
              "You must be logged in to add a review for this course",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Saved Successfully",
        description: "You have successfully saved this course.",
        variant: "default",
      });
    },
  });

  const { data: savedCourse } = useQuery({
    queryKey: ["savedCourses"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/saved/${params.id}`);
      return data;
    },
  });


  return (
    <>
      {savedCourse ? (
        <Button disabled>Saved</Button>
      ) : (
        <Button
          onClick={() => savePost()}
          disabled={savedLoading}
          className="bg-red-600"
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default AddToFavButton;
