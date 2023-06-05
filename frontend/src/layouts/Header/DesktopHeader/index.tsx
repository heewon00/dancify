import Logo from "@components/Logo";
import { MainNav } from "./MainNav";
import Search from "@components/ui/search";
import { UserNav } from "./UserNav";

export default function DesktopHeader() {
  return (
    <div className="fixed top-0 hidden w-full border-b md:block">
      <div className="container flex h-16 w-full items-center justify-between gap-4">
        <div className="row-center">
          {/* 로고 */}
          <Logo />
          {/* 네비게이션 */}
          <MainNav />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {/* 검색 아이콘 */}
          <Search />
          {/* 유저 프로필 드롭다운 */}
          <UserNav />
        </div>
      </div>
    </div>
  );
}