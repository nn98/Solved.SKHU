import React, { useState,useEffect } from "react";
import MaxWidthDialog from "./MaxWidthDialog";
import ContentCard from "./ContentCard";
import Slide from "@mui/material/Slide";

import Dialog from '@mui/material/Dialog'

import UserPage from './userCom/userPage'
import testttt from './image/panda.gif'
import Panda from './lottiCom/Panda'
import img from './image/test2.png'

function StudentInfo(props) {
  const [userOpen, setUserOpen] = useState(false);
  const [algoOpen, setAlgoOpen] = useState(false);
  const [recoOpen, setRecoOpen] = useState(false);
  const [rankOpen, setRankOpen] = useState(false);
  const [randOpen, setRandOpen] = useState(false);
  const [qnaOpen, setQnAOpen] = useState(false);
  const [slide, setSlide] = React.useState(false);

  useEffect(() => {
    setTimeout(function () {
      setSlide(true);
    }, 1000);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        // backgroundColor: 'greenyellow',
        height: '100vh',
      }}
    >
      <Slide direction="up" in={slide} timeout={1000}>
        <div
          style={{
            display: "inline-block",
            marginLeft: "30vw",
            marginTop: "2vh",
          }}
        >
          <ContentCard
            title={"USER"}
            text={"내 정보 확인"}
            height={"46vh"}
            width={"46vw"}
            open={userOpen}
            setOpen={setUserOpen}
          ></ContentCard>
        </div>
      </Slide>
       <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={userOpen}
        onClose={() => setUserOpen(!userOpen)}
      >
        <UserPage userName={props.userName} />
      </Dialog>
      
      <div style={{ display: "inline-grid" }}>
        <Slide direction="up" in={slide} timeout={1000}>
          <div
            style={{
              display: "inline-block",
              marginLeft: "1.5vw",
              marginTop: "2vh",
            }}
          >
            <ContentCard
              title={"SKHU Algorthme"}
              text={"성공회대 추천 알고리즘"}
              height={"21.75vh"}
              width={"21vw"}
              open={algoOpen}
              setOpen={setAlgoOpen}
            ></ContentCard>
          </div>
        </Slide>
        <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={algoOpen}
        onClose={() => setAlgoOpen(!algoOpen)}
      >
        <div
          style={{
            background: 'red',
            backgroundImage: 'url("./image/test.png")',
          }}
        >
          algorithm
        </div>
      </Dialog>

        <Slide direction="up" in={slide} timeout={2000}>
          <div
            style={{
              display: "inline-block",
              marginLeft: "1.5vw",
              marginTop: "2vh",
            }}
          >
            <ContentCard
              title={"Recommand"}
              text={"사용자 추천 알고리즘"}
              height={"21.75vh"}
              width={"21vw"}
              open={recoOpen}
              setOpen={setRecoOpen}
            ></ContentCard>
          </div>
        </Slide>
         <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={recoOpen}
        onClose={() => setRecoOpen(!recoOpen)}
      >
        recommend
      </Dialog>
      </div>
      
      
      <Slide direction="up" in={slide} timeout={2500}>
        <div
          style={{
            display: "inline-block",
            marginLeft: "57vw",
            marginTop: "2vh",
          }}
        >
          <ContentCard
            title={"Ranking"}
            text={"성공회대 구성원 랭킹"}
            height={"21vh"}
            width={"27vw"}
            open={rankOpen}
            setOpen={setRankOpen}
          ></ContentCard>
        </div>
      </Slide>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={rankOpen}
        onClose={() => setRankOpen(!rankOpen)}
      >
        rank
      </Dialog>
      
      
      <Slide direction="up" in={slide} timeout={2500}>
        <div
          style={{
            display: "inline-block",
            marginLeft: "1.5vw",
            marginTop: "2vh",
          }}
        >
          <ContentCard
            title={"Random"}
            text={"백준 문제 랜덤 뽑기"}
            height={"21vh"}
            width={"13vw"}
            open={randOpen}
            setOpen={setRandOpen}
          ></ContentCard>
        </div>
      </Slide>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={randOpen}
        onClose={() => setRandOpen(!randOpen)}
      >
        random
      </Dialog>
      

      <Slide direction="up" in={slide} timeout={2750}>
        <div
          style={{
            display: "inline-block",
            marginLeft: "48.5vw",
            marginTop: "2vh",
          }}
        >
          <ContentCard
            title={"QnA"}
            text={"익명게시판"}
            height={"25vh"}
            width={"50vw"}
            open={qnaOpen}
            setOpen={setQnAOpen}
          ></ContentCard>
        </div>
      </Slide>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={qnaOpen}
        onClose={() => setQnAOpen(!qnaOpen)}
      >
        random
      </Dialog>
      
      <div style={{ position: 'absolute', top: '50vh', left: '10vw' }}>
        test
        <Panda />
      </div>
      
    </div>
  );
}

export default StudentInfo;
