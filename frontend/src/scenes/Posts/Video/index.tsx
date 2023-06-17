import GenreButtons from "@components/GenreButtons";
import VideoPostHeader from "./VideoItem/VideoPostHeader";
import VideoPostList from "@scenes/Posts/Video/VideoItem/VideoPostList";
import CreateButton from "@scenes/Posts/Video/VideoItem/CreateButton";

import { useReadVideoPostsPerPage } from "@api/posts/readVideoPostsPerPage";

export default function VideoPosts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadVideoPostsPerPage();

  return (
    <>
      <div className="bg-background">
        <GenreButtons />

        <VideoPostHeader />

        {/* 자유게시판 fetch 결과 출력 */}
        <VideoPostList
          post={{
            data,
            error,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            status,
          }}
        />

        {/* 게시글 추가 버튼 */}
        <CreateButton />
      </div>
    </>
  );
}
