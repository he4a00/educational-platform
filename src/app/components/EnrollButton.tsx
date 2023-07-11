import { Button } from "@/components/ui/ui/button";
import { useToast } from "@/components/ui/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { startTransition } from "react";
import { CreateSubscribtionPayload } from "../lib/validators/subscribtion";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { getAuthSession } from "../lib/auth";

interface EnrollButtonProps {
  className?: string;
  courseId: string;
}

//TODO: add the logic for the enroll course and make the lessons appear

const EnrollButton = ({ className, courseId }: EnrollButtonProps) => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const { toast } = useToast();

  const { mutate: enrollCourse, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubscribtionPayload = {
        courseId,
      };

      const { data } = await axios.post("/api/subscribtion/", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: "You have already enrolled this course",
            description: "You have already enrolled this course",
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
    onSuccess: () => {
      toast({
        title: "You're Part of this Course now.",
        description: "You Enrolled this course successfully",
        variant: "default",
      });
      startTransition(() => {
        router.prefetch(`/course/${courseId}`);
      });
    },
  });

  const { data: subscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ["subscribtions"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/subscribtion/${params.id}`);
      return data;
    },
  });

  const isSubscribed = subscription?.isSubscribed;

  return (
    <>
      {isSubscribed ? (
        <Button disabled={true} className={`w-full ${className}`}>
          Enrolled
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          onClick={() => enrollCourse()}
          className={`w-full ${className}`}
        >
          Enroll Course
        </Button>
      )}
    </>
  );
};

export default EnrollButton;
