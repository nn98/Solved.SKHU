import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import stbg from './studentCom/userCom/image/STBG.png'

// Front.css
const ProButton = styled.button`
  background-color: #00000000;
  border: 3px solid white;
  color: white;
  font-size: large;
  font-weight: bold;
  width: 10%;
  height: 5%;
  position: absolute;
  top: 45%;
  left: 20%;
  z-index: 2;
  &:hover {
    background-color: #00000077;
    transition: 1s;
  }
`
const StuButton = styled.button`
  background-color: #00000000;
  border: 3px solid white;
  color: white;
  font-size: large;
  font-weight: bold;
  width: 10%;
  height: 5%;
  position: absolute;
  top: 45%;
  left: 70%;
  z-index: 2;
  &:hover {
    background-color: #00000077;
    transition: 1s;
  }
`
const ProDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: blueviolet;
  position: absolute;
`
const StuDiv = styled.div`
  width: 100%;
  height: 100vh;
  left: 50%;

  background-image: url(${stbg});
  background-size: cover;

  //background-color: greenyellow;
  position: absolute;
  z-index: 1;
`
function Main() {
  const [stuStyle, setStuStyle] = useState({})
  const [butStyle, setButStyle] = useState({})
  const navigate = useNavigate()
  const proClick = () => {
    setStuStyle({ transform: 'translate(50%)', transition: '1s' })
    setButStyle({ opacity: '0', transition: '0.5s' })
  }
  const stuClick = () => {
    setStuStyle({
      transform: 'translate(-50%)',
      transition: '1s',
    })
    setButStyle({ opacity: '0', transition: '0.5s' })

    setTimeout(function () {
      navigate('/test')
    }, 1000)
  }

  return (
    <div>
      <ProButton style={butStyle} onClick={() => proClick()}>
        교수용
      </ProButton>
      <StuButton style={butStyle} onClick={() => stuClick()}>
        학생용
      </StuButton>
      <ProDiv></ProDiv>
      <StuDiv style={stuStyle}></StuDiv>
    </div>
  )
}
export default Main
