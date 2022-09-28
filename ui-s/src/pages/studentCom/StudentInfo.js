import React, { useState } from 'react'
import ContentCard from './ContentCard'

import Dialog from '@mui/material/Dialog'

import UserPage from './userCom/userPage'
import testttt from './image/panda.gif'
import Panda from './lottiCom/Panda'
import img from './image/test2.png'

function StudentInfo(props) {
  const [userOpen, setUserOpen] = useState(false)
  const [algoOpen, setAlgoOpen] = useState(false)
  const [recoOpen, setRecoOpen] = useState(false)
  const [rankOpen, setRankOpen] = useState(false)
  const [randOpen, setRandOpen] = useState(false)
  const [qnaOpen, setQnAOpen] = useState(false)

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        // backgroundColor: 'greenyellow',
        height: '100vh',
      }}
    >
      <ContentCard
        title={'USER'}
        text={props.userName}
        height={'46%'}
        width={'46%'}
        left={'30%'}
        top={'2%'}
        open={userOpen}
        setOpen={setUserOpen}
        testttt={testttt}
      />
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={userOpen}
        onClose={() => setUserOpen(!userOpen)}
      >
        <UserPage userName={props.userName} />
      </Dialog>

      {/* 성공회대 추천 알고리즘 */}
      <ContentCard
        title={'SKHU Algorthme'}
        text={'성공회대 추천 알고리즘'}
        height={'21%'}
        width={'21%'}
        left={'78%'}
        top={'2%'}
        open={algoOpen}
        setOpen={setAlgoOpen}
      ></ContentCard>
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
      {/* <MaxWidthDialog
        title={'SKHU Algorthme'}
        open={algoOpen}
        setOpen={setAlgoOpen}
      ></MaxWidthDialog> */}

      {/* 사용자 추천 알고리즘 */}
      <ContentCard
        title={'Recommand'}
        text={'사용자 추천 알고리즘'}
        height={'21%'}
        width={'21%'}
        left={'78%'}
        top={'27%'}
        open={recoOpen}
        setOpen={setRecoOpen}
      ></ContentCard>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={recoOpen}
        onClose={() => setRecoOpen(!recoOpen)}
      >
        recommend
      </Dialog>
      {/* <MaxWidthDialog open={recoOpen} setOpen={setRecoOpen}></MaxWidthDialog> */}

      <ContentCard
        title={'Ranking'}
        text={'성공회대 구성원 랭킹'}
        height={'21%'}
        width={'27%'}
        left={'57%'}
        top={'50%'}
        open={rankOpen}
        setOpen={setRankOpen}
      ></ContentCard>

      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={rankOpen}
        onClose={() => setRankOpen(!rankOpen)}
      >
        rank
      </Dialog>

      {/* <MaxWidthDialog open={rankOpen} setOpen={setRankOpen}></MaxWidthDialog> */}

      <ContentCard
        title={'Random'}
        text={'백준 문제 랜덤 뽑기'}
        height={'21%'}
        width={'13%'}
        left={'86%'}
        top={'50%'}
        open={randOpen}
        setOpen={setRandOpen}
      />
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={randOpen}
        onClose={() => setRandOpen(!randOpen)}
      >
        random
      </Dialog>
      {/* <MaxWidthDialog open={randOpen} setOpen={setRandOpen}></MaxWidthDialog> */}

      <ContentCard
        title={'QnA'}
        text={'익명게시판'}
        height={'25%'}
        width={'50%'}
        left={'49%'}
        top={'73%'}
        open={qnaOpen}
        setOpen={setQnAOpen}
      />
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={qnaOpen}
        onClose={() => setQnAOpen(!qnaOpen)}
      >
        random
      </Dialog>
      {/* <MaxWidthDialog open={qnaOpen} setOpen={setQnAOpen}></MaxWidthDialog> */}

      <div style={{ position: 'absolute', top: '50vh', left: '10vw' }}>
        test
        <Panda />
      </div>
    </div>
  )
}

export default StudentInfo
