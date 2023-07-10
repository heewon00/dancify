import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import DancerPostDetail from "@scenes/DancerPosts/DancerDetail";
import { useEffect, useState } from "react";
import verifyUser from "@api/auth/verifyUser";

export default function DancerSectionPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.replace("/signin");
    });
  }, []);

  if (typeof id === "string") {
    return (
      <MainLayout>{isJwtVerified && <DancerPostDetail id={id} />}</MainLayout>
    );
  }
}
