import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import randomBox from './image/randomBox.json'
import BoxEffect from './image/BoxEffect.json'
import ProCard from '../recoCom/proCard'
function RandomPage(props) {
  const [time, setTime] = useState(0)
  const [time2, setTime2] = useState(0)
  const [randomProblem, setRandomProblem] = useState([
    { SOLVED_RANK: 1, ID: 1000, namekr: 'A+B', rate: '41.527%' },
  ])

  useEffect(() => {
    console.log('-------------------- at randomPage--------------------')
    const requestOptions = {
      // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
      method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
      headers: {
        'Content-Type': 'application/json',
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON
        .stringify
        // 이 body에 해당하는 데이터를 서버가 받아서 처리합니다.
        (),
    }
    // console.log('serverAddress', props.serverAddress)

    const random = async () => {
      try {
        await fetch(props.serverAddress + '/randomProblem', requestOptions)
          .then(async (res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
          .then(async (data) => {
            // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
            console.log('get randomProblem', data)
            setRandomProblem(data)
          })
      } catch (error) {
        console.error(error)
      }
    }

    random()
    setTimeout(() => {
      setTime(1)
    }, 1000)
    setTimeout(() => {
      setTime2(1)
    }, 600)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // var randomNo = (Math.floor)(Math.random()*24726+1000)
  return (
    <div>
      <div
        style={{
          position: 'relative',
          // width: '100vw',
          height: '90vh',
          overflow: 'hidden',
        }}
        onClick={(e) => {
          props.setOpen(false)
        }}
      >
        <Lottie
          loop={false}
          animationData={randomBox}
          style={{
            height: '100%',
            width: '30%',
            position: 'absolute',
            left: '30%',
          }}
        />
        <Lottie
          loop={1}
          animationData={BoxEffect}
          style={{
            top: '-25vh',
            left: '10%',
            width: '70%',
            position: 'absolute',
            opacity: `${time2}`,
            transition: 'opacity 0.3s ease 0.3s',
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
            // problem={randomProblem}
            top={'25vh'}
            fontSize={'2rem'}
            // proTier={'13'}
            // proColor={'#ec9a00'}
            width={'100%'}
            height={'40%'}
            proColor={
              30 - randomProblem[0].SOLVED_RANK === 30
                ? '#ffffff'
                : props.COLORS[30 - randomProblem[0].SOLVED_RANK]
            }
            proTier={randomProblem[0].SOLVED_RANK}
            proNum={randomProblem[0].ID}
            proName={randomProblem[0].namekr}
            proRate={randomProblem[0].rate}
          />
        </div>
      </div>
    </div>
  )
}

export default RandomPage
