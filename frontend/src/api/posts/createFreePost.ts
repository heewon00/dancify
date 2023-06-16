import axios from "@api/axiosInstance";
import { postActions } from "@features/post/postSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store } from "@toolkit/store";
import { useRouter } from "next/router";

// 자유게시글 Create
export const createFreePost = async (postData: FormData) => {
  try {
    await axios.post("/posts/free", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.log("🚀 createFreePost:", err);
    return false;
  }
};

// useMutation
export const useCreateFreePostMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFreePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/posts/free`],
      });
      store.dispatch(postActions.finishWriting());
      router.push("/posts/free");
    },
    onError: (err) => {
      console.log("🚀 useCreateFreePostMutation:", err);
    },
  });
};