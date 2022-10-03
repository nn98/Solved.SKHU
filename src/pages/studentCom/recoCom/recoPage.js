import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ProCard from './proCard'

import crown1st from './image/crown1st.json'
import crown2nd from './image/crown2nd.json'
import crown3rd from './image/crown3rd.json'

function RecoPage(props) {
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
  const [change, setChange] = useState(false)

  const [recommendPro, setRecommendPro] = useState([])

  const BlankBox = styled.div`
    width: 14vw;
    height: 20vh;
    border: 6px solid rgba(236, 154, 0, 0);
  `
  const AlgoButton = styled.div`
    display: inline-block;
    width: 40%;
    height: 40%;
    margin: 2% 4%;
    border: solid;
  `
  const AlgoButtonInner = styled.div`
    width: 100%;
    font-size: 7vh;
    vertical-align: middle;
    display: inline-block;
    line-height: 350%;
    text-align: center;
  `

  useEffect(() => {
    console.log(COLORS)
  }, [])

  return (
    <div
      style={{
        display: 'inline-block',
        width: '100%',
        position: 'relative',
        overflow: change ? 'auto' : 'hidden',
      }}
    >
      <div
        style={
          change
            ? {
                width: '30%',
                height: '30vh',
                border: '1px solid',
                margin: '2% 2%',
                position: 'fixed',
                zIndex: 2,
                transition: '1s',
              }
            : {
                width: '60%',
                height: '60vh',
                border: '1px solid',
                margin: '8% 20% 8% 25%',
              }
        }
      >
        <AlgoButton
          onClick={() => {
            setRecommendPro(props.recommend[0])
            setChange(true)
          }}
        >
          <AlgoButtonInner></AlgoButtonInner>
        </AlgoButton>
        <AlgoButton
          onClick={() => {
            setRecommendPro(props.recommend[1])
            setChange(true)
          }}
        >
          <AlgoButtonInner></AlgoButtonInner>
        </AlgoButton>
        <AlgoButton
          onClick={() => {
            setRecommendPro(props.recommend[2])
            setChange(true)
          }}
        >
          <AlgoButtonInner></AlgoButtonInner>
        </AlgoButton>
        <AlgoButton
          onClick={() => {
            setRecommendPro(props.recommend[3])
            setChange(true)
          }}
        >
          <AlgoButtonInner></AlgoButtonInner>
        </AlgoButton>
      </div>

      <div
        style={Object.assign(
          change
            ? {
                transition: 'opacity 1s',
                transitionDelay: '1s',
                opacity: 1,
              }
            : { opacity: 0 },
          {
            // transition: '1s',
            display: 'flex',
            flexWrap: 'wrap',
            width: '60vw',
            height: '100vh',
            margin: '10% 20%',
          }
        )}
      >
        {change ? (
          <>
            {' '}
            <div
              style={{
                display: 'flex',
                margin: 'auto',
              }}
            >
              <BlankBox />
              <ProCard
                crown={crown1st}
                crownTop={'-68%'}
                crownLeft={'30%'}
                crownWidth={'40%'}
                width={'29vw'}
                height={'33vh'}
                margin={'0%'}
                fontSize={'4.5vh'}
                //   style={{ width: '55%', height: '33%' }}
                // proColor={'#ec9a00'}
                proColor={COLORS[30 - recommendPro[0].solved_rank]}
                proTier={recommendPro[0].solved_rank}
                proNum={recommendPro[0].id}
                proName={recommendPro[0].namekr}
                proRate={recommendPro[0].rate}
              />
              <BlankBox />
            </div>
            <div
              style={{
                display: 'flex',
                margin: 'auto',
              }}
            >
              <ProCard
                crown={crown2nd}
                crownTop={'-60%'}
                crownLeft={'0%'}
                crownWidth={'35%'}
                width={'24vw'}
                height={'25vh'}
                margin={'2vh 2vw'}
                fontSize={'120%'}
                proColor={COLORS[30 - recommendPro[1].solved_rank]}
                proTier={recommendPro[1].solved_rank}
                proNum={recommendPro[1].id}
                proName={recommendPro[1].namekr}
                proRate={recommendPro[1].rate}
              ></ProCard>
              {/* <div
        style={{
          width: '27vw',
          height: '30vh',
          backgroundImage: `url(${test})`,
          backgroundSize: 'cover',
        }}
      ></div> */}

              <ProCard
                crown={crown3rd}
                crownTop={'-50%'}
                crownLeft={'68%'}
                crownWidth={'30%'}
                width={'24vw'}
                height={'25vh'}
                margin={'2vh 2vw'}
                fontSize={'120%'}
                proColor={COLORS[30 - recommendPro[2].solved_rank]}
                proTier={recommendPro[2].solved_rank}
                proNum={recommendPro[2].id}
                proName={recommendPro[2].namekr}
                proRate={recommendPro[2].rate}
              ></ProCard>
            </div>
            <div
              style={{
                display: 'flex',
              }}
            >
              <ProCard
                proColor={COLORS[30 - recommendPro[3].solved_rank]}
                proTier={recommendPro[3].solved_rank}
                proNum={recommendPro[3].id}
                proName={recommendPro[3].namekr}
                proRate={recommendPro[3].rate}
              ></ProCard>
              <ProCard
                proColor={COLORS[30 - recommendPro[4].solved_rank]}
                proTier={recommendPro[4].solved_rank}
                proNum={recommendPro[4].id}
                proName={recommendPro[4].namekr}
                proRate={recommendPro[4].rate}
              ></ProCard>
              <ProCard
                proColor={COLORS[30 - recommendPro[5].solved_rank]}
                proTier={recommendPro[5].solved_rank}
                proNum={recommendPro[5].id}
                proName={recommendPro[5].namekr}
                proRate={recommendPro[5].rate}
              ></ProCard>
            </div>
            <div
              style={{
                display: 'flex',
              }}
            >
              <ProCard
                proColor={COLORS[30 - recommendPro[6].solved_rank]}
                proTier={recommendPro[6].solved_rank}
                proNum={recommendPro[6].id}
                proName={recommendPro[6].namekr}
                proRate={recommendPro[6].rate}
              ></ProCard>
              <ProCard
                proColor={COLORS[30 - recommendPro[7].solved_rank]}
                proTier={recommendPro[7].solved_rank}
                proNum={recommendPro[7].id}
                proName={recommendPro[7].namekr}
                proRate={recommendPro[7].rate}
              ></ProCard>
              <ProCard
                proColor={COLORS[30 - recommendPro[8].solved_rank]}
                proTier={recommendPro[8].solved_rank}
                proNum={recommendPro[8].id}
                proName={recommendPro[8].namekr}
                proRate={recommendPro[8].rate}
              ></ProCard>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default RecoPage
