import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import randomBox from './image/randomBox.json'
import test1 from './image/question5.json'
import test2 from './image/question1.json'
import ProCard from '../recoCom/proCard'
function RandomPage(props) {
  const [time, setTime] = useState(0)
  useEffect(
    () =>
      setTimeout(() => {
        setTime(1)
        console.log('5555')
      }, 1000),
    []
  )

  // var randomNo = (Math.floor)(Math.random()*24726+1000)
  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '90vh',
          overflow: 'hidden',
        }}
      >
        <Lottie
          loop={false}
          delay={'1s'}
          animationData={randomBox}
          style={{
            height: '100%',
            width: '30%',
            position: 'absolute',
            left: '30%',
          }}
        />
        <Lottie
          animationData={test1}
          style={{
            top: '-20vh',
            left: '10%',
            width: '70%',
            position: 'absolute',
          }}
        />
        <Lottie
          loop={false}
          animationData={test2}
          style={{
            top: '-10vh',
            width: '100%',
            position: 'absolute',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '40%',
            height: '100%',
            left: '25%',
            opacity: `${time}`,
            transition: 'opacity 0.3s ease 0.3s',
          }}
        >
          <ProCard
            top={'25vh'}
            fontSize={'2rem'}
            proTier={'13'}
            proColor={'#ec9a00'}
            width={'100%'}
            height={'40%'}
          />
        </div>
      </div>
    </div>
  )
}

export default RandomPage
