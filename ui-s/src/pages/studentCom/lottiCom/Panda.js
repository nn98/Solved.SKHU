import React, { useEffect } from 'react'
import lottie from 'lottie-web'

import Lottie from 'lottie-react'
import aniPanda from '../image/69759-panda-in-ufo.json'
function Panda() {
  const container = document.querySelector('#container')
  useEffect(() => {
    lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: aniPanda,
    })
  }, [])
  return (
    <>
      <Lottie animationData={aniPanda} style={{ width: '20vw' }} />
    </>
  )
}

export default Panda
