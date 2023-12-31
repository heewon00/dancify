import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";

import { TPostId } from "@type/posts";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { practiceActions } from "@features/practice/practiceSlice";
import { useReadVideoSection } from "@api/videoSection/readVideoSection";

import Loading from "@components/Loading";
import Step from "@components/Step";
import { Button } from "@components/ui/button";

import Config from "./Config";
import Prepare from "./Prepare";
import Play from "./Play";
import Result from "./Result";
import Finish from "./Finish";
import { X } from "lucide-react";
import ButtonWrapper from "@components/Animation/ButtonWrapper";
import ExitEndButton from "./ExitForceButton";

export default function Practice({ postId }: { postId: TPostId }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.practice.step);

  // 페이지 관리 state
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(
    null
  );

  // API GET 요청
  const { data, isLoading, error } = useReadVideoSection(postId);

  // 연습 초기화
  useEffect(() => {
    dispatch(practiceActions.resetPractice());
  }, []);

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
    <main className="h-full w-full">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <div>에러</div>
      ) : //! 임시 조건 허용 data.dancerPost.hasOwnProperty("postId") && data.sections.length > 0
      data ? (
        <>
          <Step isActive={step === 1}>
            <Config data={data} />
          </Step>

          <Step isActive={step === 2}>
            <Prepare data={data} setDetector={setDetector} />
          </Step>

          {detector && (
            <Step isActive={step === 3}>
              <Play data={data} detector={detector} />
            </Step>
          )}

          <Step isActive={step === 4}>
            <Result data={data} />
          </Step>

          <Step isActive={step === 5}>
            <Finish />
          </Step>

          {/* 강제 연습 종료 버튼 */}
          <div className="fixed top-12 right-12 md:right-10 md:top-10 text-black">
            <ExitEndButton />
          </div>
        </>
      ) : (
        <div className="col-center gap-4">
          <h2 className="text-xl font-bold">데이터가 없습니다.</h2>

          <Link href="/">
            <Button>홈으로 이동</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
