import React, { useState } from 'react'
import MaxWidthDialog from './MaxWidthDialog'
import ContentCard from './ContentCard'
import Slide from '@mui/material/Slide'
import { useEffect } from 'react'

import Dialog from '@mui/material/Dialog'

import UserPage from './userCom/userPage'
import AlgoPage from './algoCom/algoPage'

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
      <Slide direction="up" in={slide} timeout={1000}>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '30vw',
            marginTop: '2vh',
          }}
        >
          <ContentCard
            title={'USER'}
            text={'내 정보 확인'}
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
      >
        <UserPage userName={props.userName} />
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
              title={'SKHU Algorthme'}
              text={'성공회대 추천 알고리즘'}
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
        >
          <AlgoPage />
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
              title={'Recommand'}
              text={'사용자 추천 알고리즘'}
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
        >
          tset1
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
            title={'Ranking'}
            text={'성공회대 구성원 랭킹'}
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
      >
        tset1
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
            title={'Random'}
            text={'백준 문제 랜덤 뽑기'}
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
      >
        tset1
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
            title={'QnA'}
            text={'익명게시판'}
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
        tset1
      </Dialog>
      {/* <MaxWidthDialog open={qnaOpen} setOpen={setQnAOpen}></MaxWidthDialog> */}
    </>
  )
}

export default StudentInfo
