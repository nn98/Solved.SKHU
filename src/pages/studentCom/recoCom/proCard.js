import React from 'react'
import cardBgBronze from './image/cardBg0.png'
import cardBgSilver from './image/cardBg1.png'
import cardBgGold from './image/cardBg2.png'
import cardBgPlatinum from './image/cardBg3.png'
import cardBgDiamond from './image/cardBg4.png'
import cardBgRuby from './image/cardBg5.png'
import cardBgNotratable from './image/cardBg6.png'

import styled from '@emotion/styled'
import Lottie from 'lottie-react'

function ProCard(props) {
  const cardBg =
    props.proTier === 0
      ? cardBgNotratable
      : props.proTier >= 1 && props.proTier <= 5
      ? cardBgBronze
      : props.proTier >= 6 && props.proTier <= 10
      ? cardBgSilver
      : props.proTier >= 11 && props.proTier <= 15
      ? cardBgGold
      : props.proTier >= 16 && props.proTier <= 20
      ? cardBgPlatinum
      : props.proTier >= 21 && props.proTier <= 25
      ? cardBgDiamond
      : cardBgRuby
  //   const t = document.getElementById('proCard').clientWidth
  //   console.log(t)
  // console.log("props", props);
  // console.log("problems", props.problem);
  return (
    <a
      onClick={(e) => e.stopPropagation()}
      href={'https://www.acmicpc.net/problem/' + props.proNum}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProCardBackground
        id="proCard"
        cardBg={cardBg}
        proColor={props.proColor}
        style={{
          top: `${props.top}`,
          width: `${props.width}`,
          height: `${props.height}`,
          margin: `${props.margin}`,
          display: 'inline-block',
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
        <ProCardContent proTier={props.proTier}></ProCardContent>
        <ProCardTitle fontSize={props.fontSize}>{props.proName}</ProCardTitle>
        <div>
          <ProCardNum
            style={{
              left: '23%',
            }}
            fontSize={props.fontSize}
          >
            <span style={{ color: `${props.proColor}` }}>P</span>roblem{' '}
            {props.proNum}
          </ProCardNum>
          <ProCardLine
            style={{
              top: '55%',
            }}
            proColor={props.proColor}
          ></ProCardLine>
        </div>
        <div>
          <ProCardNum
            style={{
              top: '65%',
              right: '23%',
            }}
            fontSize={props.fontSize}
          >
            <span style={{ verticalAlign: 'middle' }}>
              {props.proSum ? (
                props.proSum + '명 시도'
              ) : (
                <>
                  <span style={{ color: `${props.proColor}` }}>C</span>orrect{' '}
                  {props.proRate}
                </>
              )}
            </span>
          </ProCardNum>
          <ProCardLine
            style={{
              top: '80%',
              right: 0,
            }}
            proColor={props.proColor}
          ></ProCardLine>
        </div>
      </ProCardBackground>
    </a>
  )
}

export default ProCard

const ProCardBackground = styled.div`
  width: 17vw;
  height: 20vh;
  margin: 1.1vw;
  background-image: url(${({ cardBg }) => cardBg});
  border-radius: 10px;
  background-size: cover;
  position: relative;
  border-style: solid;
  border-color: ${({ proColor }) => proColor};
  border-width: 0.3vw;
  // border: 6px solid ;
  box-shadow: 5px 5px 15px 1px ${({ proColor }) => proColor + 88};
  &:hover {
    transform: scale(105%);
    transition: 0.5s;
  }

  &:not(:hover) {
    transform: scale(100%);
    transition: 0.5s;
  }
`
const ProCardContent = styled.div`
  width: 20%;
  height: 40%;
  margin-top: -0.2%;
  margin-left: 10%;
  // display: inline-block;
  background-repeat: no-repeat;
  background-image: ${(props) =>
    `url(https://static.solved.ac/tier_small/${props.proTier}.svg)`};
`
const ProCardTitle = styled.div`
  width: 60%;
  left: 30%;
  top: 10%;
  font-size: ${(props) =>
    props.fontSize === undefined ? '2.5vh' : props.fontSize};
  position: absolute;
  display: inline-block;
  color: #ffffff;
  text-shadow: 2px 2px 6px gray;
`
const ProCardLine = styled.div`
  width: 72%;
  background-color: ${(props) => props.proColor};
  height: 1.3%;
  position: absolute;
`
const ProCardNum = styled.div`
  position: absolute;
  text-align: center;
  font-size: ${(props) => (props.fontSize === undefined ? '2vh' : '2.5vh')};
  background-color: #00000050;
  color: #ffffff;
  height: 15%;
  width: 50%;
`
