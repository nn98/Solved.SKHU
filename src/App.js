import React, { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Lottie from 'lottie-react'
import cry from './image/crying.json'

import Main from './pages/Main'
import Assignments from './pages/Assignments'
import Student from './pages/Student'
import styled from '@emotion/styled'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function App({ children }) {
  const serverAddress = 'https://sol-skhu.duckdns.org:3002'

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )
  const [correctSize, setCorrectSize] = useState(false)

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    // console.log(windowDimensions)
    if (windowDimensions.width >= 900) {
      setCorrectSize(true)
      console.log('800 이하임.')
    } else {
      setCorrectSize(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowDimensions])

  return (
    <div className="rr" style={{ overflow: 'auto' }}>
      {correctSize ? (
        <></>
      ) : (
        <FullSize>
          <Center>
            <Lottie loop={true} animationData={cry} style={{ width: '30vh' }} />
            모바일 화면은 지원하지 않습니다.
          </Center>
        </FullSize>
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/assignments"
          element={<Assignments serverAddress={serverAddress} />}
        />

        <Route
          path="/Student"
          element={<Student serverAddress={serverAddress} />}
        />
      </Routes>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </div>
  )
}

export default App

const FullSize = styled.div`
  touch-action: none;
  position: fixed;
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: #000000bb;
  backdrop-filter: blur(10px);
  color: #ffffff;
  z-index: 100;
  font-weight: bolder;
`
const Center = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
