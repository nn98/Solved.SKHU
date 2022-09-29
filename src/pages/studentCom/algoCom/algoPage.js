import React from 'react'
import styled from '@emotion/styled'
import ProCard from './proCard'

import crown1st from './image/crown1st.json'
import crown2nd from './image/crown2nd.json'
import crown3rd from './image/crown3rd.json'
function AlgoPage() {
  const BlankBox = styled.div`
    width: 20%;
    height: 20%;
    border: 6px solid rgba(236, 154, 0, 0);
  `
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '60%',
          height: '100vh',
          margin: '20%',
        }}
      >
        <BlankBox />
        <ProCard
          crown={crown1st}
          crownTop={'-68%'}
          crownLeft={'30%'}
          crownWidth={'40%'}
          width={'54%'}
          height={'33%'}
          margin={'0%'}
          fontSize={'150%'}
          //   style={{ width: '55%', height: '33%' }}
          proTier={'15'}
          proColor={'#ec9a00'}
        />
        <BlankBox />
        <ProCard
          crown={crown2nd}
          crownTop={'-58%'}
          crownLeft={'0%'}
          crownWidth={'35%'}
          width={'40%'}
          height={'25%'}
          margin={'4%'}
          proTier={'11'}
          fontSize={'120%'}
          proColor={'#ec9a00'}
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
          width={'40%'}
          height={'25%'}
          margin={'4%'}
          proTier={'12'}
          fontSize={'120%'}
          proColor={'#ec9a00'}
        ></ProCard>
        <ProCard proTier={'13'} proColor={'#ec9a00'}></ProCard>
        <ProCard proTier={'14'} proColor={'#ec9a00'}></ProCard>
        <ProCard proTier={'15'} proColor={'#ec9a00'}></ProCard>
        <ProCard proTier={'15'} proColor={'#ec9a00'}></ProCard>
        <ProCard proTier={'15'} proColor={'#ec9a00'}></ProCard>
        <ProCard proTier={'15'} proColor={'#ec9a00'}></ProCard>
      </div>
    </div>
  )
}

export default AlgoPage
