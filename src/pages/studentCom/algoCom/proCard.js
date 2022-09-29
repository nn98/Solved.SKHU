import React from 'react'
import cardBg from './image/cardBg.png'

import styled from '@emotion/styled'
import Lottie from 'lottie-react'

function ProCard(props) {
  //   const t = document.getElementById('proCard').clientWidth
  //   console.log(t)
  const ProCardBackground = styled.div`
    width: 30%;
    height: 10vw;
    margin: 0.9%;
    background-image: url(${cardBg});
    border-radius: 10px;
    background-size: cover;
    position: relative;
    border: 6px solid ${props.proColor};
  `
  const ProCardContent = styled.div`
    width: 20%;
    height: 40%;
    margin-top: -0.2%;
    margin-left: 10%;
    display: inline-block;
    background-repeat: no-repeat;
    background-image: url(https://static.solved.ac/tier_small/${props.proTier}.svg);
  `
  const ProCardTitle = styled.div`
    width: 60%;
    left: 30%;
    top: 10%;
    font-size: 120%;
    position: absolute;
    display: inline-block;
    color: #ffffff;
    font-weight: bolder;
  `
  const ProCardLine = styled.div`
    width: 72%;
    background-color: ${props.proColor};
    border: 1px solid ${props.proColor};
    position: absolute;
  `
  const ProCardNum = styled.div`
    position: absolute;
    text-align: center;
    font-size: 104%;
    font-weight: bolder;
    background-color: #00000050;
    color: #ffffff;
    height: 15%;
    width: 50%;
  `
  return (
    <ProCardBackground
      id="proCard"
      style={{
        width: `${props.width}`,
        height: `${props.height}`,
        margin: `${props.margin}`,
        fontSize: `${props.fontSize}`,
      }}
    >
      <Lottie
        animationData={props.crown}
        style={{
          position: 'absolute',
          width: `${props.crownWidth}`,
          top: `${props.crownTop}`,
          left: `${props.crownLeft}`,
        }}
      />
      <ProCardContent></ProCardContent>
      <ProCardTitle>Balanced Lineup</ProCardTitle>
      <div>
        <ProCardNum
          style={{
            left: '23%',
          }}
        >
          <span style={{ color: `${props.proColor}` }}>P</span>roblem 6218
        </ProCardNum>
        <ProCardLine
          style={{
            top: '55%',
          }}
        ></ProCardLine>
      </div>
      <div>
        <ProCardNum
          style={{
            top: '65%',
            right: '23%',
          }}
        >
          <span style={{ verticalAlign: 'middle' }}>
            <span style={{ color: `${props.proColor}` }}>C</span>orrect 82.963%
          </span>
        </ProCardNum>
        <ProCardLine
          style={{
            top: '80%',
            right: 0,
          }}
        ></ProCardLine>
      </div>
    </ProCardBackground>
  )
}

export default ProCard
