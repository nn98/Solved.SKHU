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

import userCard from '../studentCom/userCom/image/user_page_card.png'
import recoCard from '../studentCom/userCom/image/reco_page_card.png'
import algoCard from '../studentCom/userCom/image/algo_page_card.png'
import rankCard from '../studentCom/userCom/image/rank_page_card.png'
import qnaCard from '../studentCom/userCom/image/qna_page_card.png'
import question from '../studentCom/userCom/image/question.json'

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
        >
          <RecoPage recommend={props.recommend} />
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
        <Rank ranking={props.ranking} />
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
