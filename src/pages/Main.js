import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import stbg from './studentCom/userCom/image/STBG.png'
import pfbg from './studentCom/userCom/image/PFBG.png'
// import pfbg from './proffessorCom/image/bg01.png'

function Main() {
  const [proBG,setProBG] = useState(false);
  const [stuStyle, setStuStyle] = useState({})
  const [butStyle, setButStyle] = useState({})
  const navigate = useNavigate()
  const proClick = () => {
    setStuStyle({ transform: 'translate(50%)', transition: '1s',})
    setButStyle({ opacity: '0', transition: '0.5s' })

    setTimeout(function () {
      setProBG(true)
      setTimeout(function () {
        navigate('/assignments')
      }, 500)
    }, 1000)
  }
  const stuClick = () => {
    setStuStyle({
      transform: 'translate(-50%)',
      transition: '1s',
    })
    setButStyle({ 
      opacity: '0',
      transition: '0.5s' 
    })

    setTimeout(function () {
      navigate('/test')
    }, 1000)
  }

  return (
    <div>
      <ProButton style={butStyle} onClick={() => {
        proClick()
      }}>
        교수용
      </ProButton>
      <StuButton style={butStyle} onClick={() => stuClick()}>
        학생용
      </StuButton>
      <ProDiv>
        <div style={{width:'100%',height:'100%',background:"#000000", opacity: proBG?0.2:0,
            transition: 'opacity 0.3s'}}></div>
            </ProDiv>
      <StuDiv style={stuStyle}></StuDiv>
    </div>
  )
}
export default Main

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
  z-index: 3;
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
  z-index: 3;
  &:hover {
    background-color: #00000077;
    transition: 1s;
  }
`
const ProDiv = styled.div`
  z-index : 1;
  width: 100%;
  height: 100vh;
  background-image: url(${pfbg});
  backgroun-size : cover;
  position: absolute;
`
const StuDiv = styled.div`
  width: 100%;
  height: 100vh;
  left: 50%;
  background-image: url(${stbg});
  background-size: cover;
  position: absolute;
  z-index: 1;
`