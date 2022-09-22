import React, { useState } from "react";
import MaxWidthDialog from "./MaxWidthDialog";
import ContentCard from "./ContentCard";

function Student() {
  const [userOpen, setUserOpen] = useState(false);
  const [algoOpen, setAlgoOpen] = useState(false);
  const [recoOpen, setRecoOpen] = useState(false);
  const [rankOpen, setRankOpen] = useState(false);
  const [randOpen, setRandOpen] = useState(false);
  const [qnaOpen, setQnAOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "greenyellow",
        height: "100vh",
      }}
    >
      <ContentCard
        title={"USER"}
        text={"내 정보 확인"}
        height={"46%"}
        width={"46%"}
        left={"30%"}
        top={"2%"}
        open={userOpen}
        setOpen={setUserOpen}
      ></ContentCard>
      <MaxWidthDialog
        title={"USER"}
        open={userOpen}
        setOpen={setUserOpen}
      ></MaxWidthDialog>

      <ContentCard
        title={"SKHU Algorthme"}
        text={"성공회대 추천 알고리즘"}
        height={"21%"}
        width={"21%"}
        left={"78%"}
        top={"2%"}
        open={algoOpen}
        setOpen={setAlgoOpen}
      ></ContentCard>
      <MaxWidthDialog
        title={"SKHU Algorthme"}
        open={algoOpen}
        setOpen={setAlgoOpen}
      ></MaxWidthDialog>

      <ContentCard
        title={"Recommand"}
        text={"사용자 추천 알고리즘"}
        height={"21%"}
        width={"21%"}
        left={"78%"}
        top={"27%"}
        open={recoOpen}
        setOpen={setRecoOpen}
      ></ContentCard>
      <MaxWidthDialog open={recoOpen} setOpen={setRecoOpen}></MaxWidthDialog>

      <ContentCard
        title={"Ranking"}
        text={"성공회대 구성원 랭킹"}
        height={"21%"}
        width={"27%"}
        left={"57%"}
        top={"50%"}
        open={rankOpen}
        setOpen={setRankOpen}
      ></ContentCard>
      <MaxWidthDialog open={rankOpen} setOpen={setRankOpen}></MaxWidthDialog>

      <ContentCard
        title={"Random"}
        text={"백준 문제 랜덤 뽑기"}
        height={"21%"}
        width={"13%"}
        left={"86%"}
        top={"50%"}
        open={randOpen}
        setOpen={setRandOpen}
      ></ContentCard>
      <MaxWidthDialog open={randOpen} setOpen={setRandOpen}></MaxWidthDialog>

      <ContentCard
        title={"QnA"}
        text={"익명게시판"}
        height={"25%"}
        width={"50%"}
        left={"49%"}
        top={"73%"}
        open={qnaOpen}
        setOpen={setQnAOpen}
      ></ContentCard>
      <MaxWidthDialog open={qnaOpen} setOpen={setQnAOpen}></MaxWidthDialog>
    </div>
  );
}

export default Student;
