import React, { useState } from 'react'
import styled from '@emotion/styled'
import ProCard from './proCard'

import crown1st from './image/crown1st.json'
import crown2nd from './image/crown2nd.json'
import crown3rd from './image/crown3rd.json'

import lecUp from './image/lecUp.png'

import raUp from './image/raUp.png'
import sucUp from './image/sucUp.png'
import sucDown from './image/sucDown.png'
function RecoPage(props) {
  const [change, setChange] = useState(false)

  const [recommendPro, setRecommendPro] = useState([])

  return (
    <div
      style={{
        display: 'inline-block',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: change ? 'auto' : 'hidden',
      }}
      onClick={(e) => {
        props.setOpen(false)
      }}
    >
      <div
        style={
          change
            ? {
                width: '30%',
                height: '30vh',
                // border: '1px solid',
                margin: '2% 2%',
                position: 'fixed',
                zIndex: 2,
                transition: '1s',
              }
            : {
                width: '100%',
                height: '100%',
                // border: '1px solid',
                // margin: '8% 20% 8% 25%',
              }
        }
      >
        <AlgoButton
          onClick={(e) => {
            e.stopPropagation()
            setRecommendPro(props.recommend[0])
            setChange(true)
          }}
          style={{
            backgroundImage: `url(${sucUp})`,
            backgroundSize: 'cover',
            marginLeft: '7%',
          }}
        >
          {' '}
        </AlgoButton>
        <AlgoButton
          style={{
            backgroundImage: `url(${sucDown})`,
            backgroundSize: 'cover',
            marginRight: '7%',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setRecommendPro(props.recommend[1])
            setChange(true)
          }}
        ></AlgoButton>
        <AlgoButton
          style={{
            backgroundImage: `url(${raUp})`,
            backgroundSize: 'cover',
            marginLeft: '7%',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setRecommendPro(props.recommend[2])
            setChange(true)
          }}
        ></AlgoButton>
        <AlgoButton
          style={{
            backgroundImage: `url(${lecUp})`,
            backgroundSize: 'cover',
            marginRight: '7%',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setRecommendPro(props.recommend[3])
            setChange(true)
          }}
        ></AlgoButton>
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
                crownTop={'-170px'}
                crownLeft={'30%'}
                crownWidth={'35%'}
                width={'29vw'}
                height={'33vh'}
                margin={'0%'}
                fontSize={'xx-large'}
                //   style={{ width: '55%', height: '33%' }}
                // proColor={'#ec9a00'}
                proColor={
                  30 - recommendPro[0].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[0].solved_rank]
                }
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
                proColor={
                  30 - recommendPro[1].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[1].solved_rank]
                }
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
                proColor={
                  30 - recommendPro[2].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[2].solved_rank]
                }
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
                proColor={
                  30 - recommendPro[3].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[3].solved_rank]
                }
                proTier={recommendPro[3].solved_rank}
                proNum={recommendPro[3].id}
                proName={recommendPro[3].namekr}
                proRate={recommendPro[3].rate}
              ></ProCard>
              <ProCard
                proColor={
                  30 - recommendPro[4].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[4].solved_rank]
                }
                proTier={recommendPro[4].solved_rank}
                proNum={recommendPro[4].id}
                proName={recommendPro[4].namekr}
                proRate={recommendPro[4].rate}
              ></ProCard>
              <ProCard
                proColor={
                  30 - recommendPro[5].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[5].solved_rank]
                }
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
                proColor={
                  30 - recommendPro[6].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[6].solved_rank]
                }
                proTier={recommendPro[6].solved_rank}
                proNum={recommendPro[6].id}
                proName={recommendPro[6].namekr}
                proRate={recommendPro[6].rate}
              ></ProCard>
              <ProCard
                proColor={
                  30 - recommendPro[7].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[7].solved_rank]
                }
                proTier={recommendPro[7].solved_rank}
                proNum={recommendPro[7].id}
                proName={recommendPro[7].namekr}
                proRate={recommendPro[7].rate}
              ></ProCard>
              <ProCard
                proColor={
                  30 - recommendPro[8].solved_rank === 30
                    ? '#ffffff'
                    : props.COLORS[30 - recommendPro[8].solved_rank]
                }
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

const BlankBox = styled.div`
  width: 14vw;
  height: 20vh;
  border: 6px solid rgba(236, 154, 0, 0);
`
const AlgoButton = styled.div`
  display: inline-block;
  width: 40%;
  height: 40%;
  margin: 2%;
  /* border: solid; */
  border-radius: 5%;
  box-shadow: 5px 5px 15px 1px black;
  &:hover {
    transform: scale(105%);
    transition: 0.5s;
  }

  &:not(:hover) {
    transform: scale(100%);
    transition: 0.5s;
  }
`
