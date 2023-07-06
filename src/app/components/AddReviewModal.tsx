import { Button } from "@/components/ui/ui/button";
import { useMutation } from "@tanstack/react-query";
import { CreateReviewPayload } from "@/app/lib/validators/reviews";
import React from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ui/use-toast";
import { XCircle } from "lucide-react";

interface AddReviewModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseId: string;
}

const AddReviewModal = ({ courseId, setIsModalOpen }: AddReviewModalProps) => {
  const [content, setContent] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);

  const { toast } = useToast();
  const router = useRouter();

  const { mutate: submitReview, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateReviewPayload = {
        content: content,
        rating: rating,
        courseId: courseId,
      };

      const { data } = await axios.post("/api/review/", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: "You have already added a review for this course",
            description: "You have already added a review for this course",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          toast({
            title: "Invalid submission",
            description:
              "Content must be above 20 characters long and below 300 characters long",
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
        title: "Review successfully submitted.",
        description: "You have successfully added a review.",
        variant: "default",
      });

      router.prefetch("/");
      setIsModalOpen(false);
    },
  });

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <XCircle
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 m-3 right-0 cursor-pointer"
          />
          <h1 className="font-bold text-2xl text-blue-500 text-center">
            Add Review
          </h1>

          <div className="p-5 flex flex-col gap-y-7 justify-center items-center">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you think about this course?"
              className="w-full border rounded-md focus:outline-none p-5"
            />
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              placeholder="Your rating for this course..."
              className="w-full border rounded-md focus:outline-none p-5"
              max={5}
            />
            <Button
              onClick={() => submitReview()}
              className="w-full"
              disabled={isLoading}
            >
              Submit Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
