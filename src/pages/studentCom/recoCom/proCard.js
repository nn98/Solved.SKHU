import React from 'react'
import cardBg from './image/cardBg.png'

import styled from '@emotion/styled'
import Lottie from 'lottie-react'

function ProCard(props) {
  //   const t = document.getElementById('proCard').clientWidth
  //   console.log(t)

  return (
    <a
      onClick={(e) => e.stopPropagation()}
      href={'https://www.acmicpc.net/problem/' + props.proNum}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProCardBackground
        id="proCard"
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
              <span style={{ color: `${props.proColor}` }}>C</span>orrect{' '}
              {props.proRate}
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
  background-image: url(${cardBg});
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
  font-weight: bolder;
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
  font-weight: bolder;
  background-color: #00000050;
  color: #ffffff;
  height: 15%;
  width: 50%;
`
