import SideBar from "../SideBar";
import { playlists } from "../data/playlists";

import DancerPostList from "@scenes/Posts/Dancer/DancerItem/DancerPostList";

import { useReadDancerPostsPerPage } from "@api/posts/readDancerPostsPerPage";

export default function DancerPosts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadDancerPostsPerPage();

  return (
    <>
      <div className="container bg-background">
        <div className="grid grid-cols-3 lg:grid-cols-5">
          <SideBar playlists={playlists} className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full py-6 lg:px-8">
              <div className="h-full space-y-6">
                <div className="h-full flex-col">
                  {/* 자유게시판 fetch 결과 출력 */}
                  <DancerPostList
                    post={{
                      data,
                      error,
                      fetchNextPage,
                      hasNextPage,
                      isFetchingNextPage,
                      status,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}