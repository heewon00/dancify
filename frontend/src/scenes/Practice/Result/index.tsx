import { useEffect } from "react";
import { useRouter } from "next/router";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import Information from "./Infomation";
import ScoreBoard from "./ScoreBoard";

export default function Result({
  onNext,
  data,
}: {
  onNext: () => void;
  data: IPractice;
}) {
  const router = useRouter();

  // 새로고침 및 뒤로가기 방지
  useEffect(() => {
    if (window) {
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <MainWrapper>
        <h1>총 연습 결과</h1>

        <div className="row-center">
          <Information />
          <ScoreBoard />
        </div>
      </MainWrapper>

      <BottomWrapper>
        <Button onClick={onNext}>확인</Button>
      </BottomWrapper>
    </div>
  );
}
