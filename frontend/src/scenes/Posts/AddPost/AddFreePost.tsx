import { useCreateFreePostMutation } from "@api/posts/createFreePost";
import Tiptap from "@components/tiptap";
import TitleForm from "@components/tiptap/TitleForm";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import UploadImage from "@components/UploadImage";
import { postActions } from "@features/post/postSlice";

export default function AddFreePost() {
  const dispatch = useAppDispatch()
  const [fileName, setFileName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
  const { postTitle, postContent } = useAppSelector((state) => state.post);

  const { mutateAsync } = useCreateFreePostMutation();

  const onSubmit = async () => {
    // title, content 필수
    if (postTitle.length < 3 || postContent.length < 3) return;

    const formData = new FormData();

    // 이미지파일 넣기
    if (imageFile) formData.append("postImage", imageFile);

    // 제목과 내용 넣기
    formData.append("title", postTitle);
    formData.append("content", postContent);

    // POST 요청
    mutateAsync(formData);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return;
  };

  useEffect(() => {
    return () => {
      dispatch(postActions.resetPostInfo());
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <TitleForm isUpdate={false}/>
      <Tiptap isUpdate={false}/>
      <UploadImage
        fileName={fileName}
        setFileName={setFileName}
        setImageFile={setImageFile}
      />
      <Button className="w-full" onClick={onSubmit}>
        작성 완료
      </Button>
    </div>
  );
}
