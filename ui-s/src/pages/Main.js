import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className="front_div">
      <button className="pro_but" style={butStyle} onClick={() => proClick()}>
        교수용
      </button>
      <button className="stu_but" style={butStyle} onClick={() => stuClick()}>
        학생용
      </button>
      <div className="pro_div"></div>
      <div className="stu_div" style={stuStyle}></div>
    </div>
  )
}

export default Main
