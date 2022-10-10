import React, { useState } from 'react'
// import MaxWidthDialog from './MaxWidthDialog'
import ContentCard from './ContentCard'
import Slide from '@mui/material/Slide'
import { useEffect } from 'react'

import Dialog from '@mui/material/Dialog'
import UserPage from './userCom/userPage'
import RecoPage from './recoCom/recoPage'
import Rank from './rankCom/rank'
import QnA from './QnA/QnA'
import RandomPage from './randomCom/randomPage'
import AlgoPage from './algoCom/algoPage'

import userCard from '../studentCom/userCom/image/user_page_card.png'
import recoCard from '../studentCom/userCom/image/reco_page_card.png'
import algoCard from '../studentCom/userCom/image/algo_page_card.png'
import rankCard from '../studentCom/userCom/image/rank_page_card.png'
import qnaCard from '../studentCom/userCom/image/qna_page_card.png'

import question from './userCom/image/question.json'
// import panda from "./userCom/image/panda.gif";

function StudentInfo(props) {
  const [userOpen, setUserOpen] = useState(false)
  const [algoOpen, setAlgoOpen] = useState(false)
  const [recoOpen, setRecoOpen] = useState(false)
  const [rankOpen, setRankOpen] = useState(false)
  const [randOpen, setRandOpen] = useState(false)
  const [qnaOpen, setQnAOpen] = useState(false)
  const [slide, setSlide] = React.useState(false)

  useEffect(() => {
    setTimeout(function () {
      setSlide(true)
    }, 1000)
  }, [])
  return (
    <>
      {/* <div className="panda">
        <img
          src={panda}
          alt="panda"
          style={{ position: "absolute", width: "20vw", bottom: "1vh" }}
        />
      </div> */}

      <Slide direction="up" in={slide} timeout={1000}>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '30vw',
            marginTop: '2vh',
          }}
        >
          <ContentCard
            url={userCard}
            height={'46vh'}
            width={'46vw'}
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
        PaperProps={{
          style: {
            backgroundColor: '#ffffffdd',
            boxShadow: 'none',
          },
        }}
      >
        <UserPage userName={props.userName} COLORS={COLORS} />
      </Dialog>

      {/* <MaxWidthDialog
        title={'USER'}
        open={userOpen}
        setOpen={setUserOpen}
      ></MaxWidthDialog> */}

      <div style={{ display: 'inline-grid' }}>
        <Slide direction="up" in={slide} timeout={1000}>
          <div
            style={{
              display: 'inline-block',
              marginLeft: '1.5vw',
              marginTop: '2vh',
            }}
          >
            <ContentCard
              url={recoCard}
              height={'21.75vh'}
              width={'21vw'}
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
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <RecoPage
            COLORS={COLORS}
            recommend={props.recommend}
            setOpen={setRecoOpen}
          />
        </Dialog>
        {/* <MaxWidthDialog
          title={'SKHU Algorthme'}
          open={algoOpen}
          setOpen={setAlgoOpen}
        ></MaxWidthDialog> */}

        <Slide direction="up" in={slide} timeout={2000}>
          <div
            style={{
              display: 'inline-block',
              marginLeft: '1.5vw',
              marginTop: '2vh',
            }}
          >
            <ContentCard
              url={algoCard}
              height={'21.75vh'}
              width={'21vw'}
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
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              transition: '1s',
            },
          }}
        >
          <AlgoPage
            setOpen={setAlgoOpen}
            userName={props.userName}
            serverAddress={props.serverAddress}
            COLORS={COLORS}
          />
        </Dialog>
        {/* <MaxWidthDialog open={recoOpen} setOpen={setRecoOpen}></MaxWidthDialog> */}
      </div>

      <Slide direction="up" in={slide} timeout={2500}>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '57vw',
            marginTop: '2vh',
          }}
        >
          <ContentCard
            url={rankCard}
            height={'21vh'}
            width={'27vw'}
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
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <Rank
          ranking={props.ranking}
          userName={props.userName}
          setOpen={setRankOpen}
        />
      </Dialog>
      {/* <MaxWidthDialog open={rankOpen} setOpen={setRankOpen}></MaxWidthDialog> */}

      <Slide direction="up" in={slide} timeout={2500}>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '1.5vw',
            marginTop: '2vh',
          }}
        >
          <ContentCard
            question={question}
            shadow={'none'}
            height={'21vh'}
            width={'13vw'}
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
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            color: 'red',
            fontSize: '5rem',
            textAlign: 'center',
          },
        }}
      >
        <RandomPage
          COLORS={COLORS}
          randOpen={randOpen}
          serverAddress={props.serverAddress}
          setOpen={setRandOpen}
        />
      </Dialog>
      {/* <MaxWidthDialog open={randOpen} setOpen={setRandOpen}></MaxWidthDialog> */}

      <Slide direction="up" in={slide} timeout={2750}>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '48.5vw',
            marginTop: '2vh',
          }}
        >
          <ContentCard
            url={qnaCard}
            height={'25vh'}
            width={'50vw'}
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
        <QnA serverAddress={props.serverAddress} />
      </Dialog>
      {/* <MaxWidthDialog open={qnaOpen} setOpen={setQnAOpen}></MaxWidthDialog> */}
    </>
  )
}
export default StudentInfo

const COLORS = [
  '#ff3071',
  '#ff0062',
  '#f5005a',
  '#ea0053',
  '#e0004c',
  '#41caff',
  '#2bbfff',
  '#00b4fc',
  '#00a9f0',
  '#009ee5',
  '#51fdbd',
  '#3ef0b1',
  '#27e2a4',
  '#00d497',
  '#00c78b',
  '#ffb028',
  '#f9a518',
  '#ec9a00',
  '#df8f00',
  '#d28500',
  '#4e6a86',
  '#496580',
  '#435f7a',
  '#3d5a74',
  '#38546e',
  '#c67739',
  '#b55d0a',
  '#ad5600',
  '#a54f00',
  '#9d4900',
]
