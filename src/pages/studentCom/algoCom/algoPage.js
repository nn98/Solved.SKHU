import React, { useState, useEffect } from 'react'
import './algo.css'
import IconN from './image/none.svg'
import IconB from './image/5.svg'
import IconS from './image/10.svg'
import IconG from './image/15.svg'
import IconP from './image/20.svg'
import IconD from './image/25.svg'
import IconM from './image/30.svg'
import Fade from '@mui/material/Fade'

import ProCard from '../recoCom/proCard'
import { color } from '@mui/system'

function AlgoPage(props) {
  // 랭크의 image를 출력하기 위한 번호
  const t = [IconN, IconB, IconS, IconG, IconP, IconD, IconM]
  const rank = [
    [0, 0, 0, 0, 0],
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30],
  ]

  const [aniChange, setAniChage] = useState(false)

  const [checked, setChecked] = useState(false)
  // 각 랭크의 서브 랭크를 넣기 위한 변수
  const [rankArray, setRankArray] = useState()

  // 유저 또는 랭크 별로 알고리즘을 받을지 결정하는 boolean 변수
  const [userOrRank, setUserOrRank] = useState(0)

  // 유저별로 추천된 문제를 저장하기 위한 변수
  const [ratingProblems, setRatingProblems] = useState([])

  // 랭크별 문제들을 저장하기 위한 변수
  const [rankProblem, setRankProblem] = useState('')

  // 비슷한 수준의 학생들을 저장하기 위한 변수
  const [similarStudent, setSimilarStudent] = useState([])

  // 유저별 문제 추천을 받기 위한 함수
  const ratingAdd = async () => {
    try {
      const body = {
        ID: props.userName,
      }
      // console.log('rating addd    ' + body)
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch(props.serverAddress + '/rating', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          // console.log(data[0])
          setRatingProblems(data[0])
          setSimilarStudent(data[1])
        })
    } catch (error) {
      console.error(error)
    }
  }

  // 각 랭크의 서브 랭크의 버튼을 추가하기 위한 함수
  const rankSubAdd = (index) => {
    setRankArray('')
    const result = []
    for (let i = 0; i < rank[index].length; i++) {
      result.push(
        <div key={i} className="rankButton">
          <img
            onClick={() => rankAdd(rank[index][i])}
            src={
              'https://static.solved.ac/tier_small/' + rank[index][i] + '.svg'
            }
            alt="profile"
          />
        </div>
      )
    }
    setChecked(true)
    setRankArray(result)
  }

  // 랭크별 문제 추천을 받기 위한 함수
  const rankAdd = (index) => {
    try {
      let t = (
        <iframe
          title="solvedProblems"
          style={{ border: 'none', marginTop: '-12rem' }}
          width="100%"
          height="150%"
          src={'https://solved.ac/problems/level/' + index}
          onload="height = myframe.document.body.scrollHeight;"
        ></iframe>
      )
      setRankProblem(t)
    } catch (err) {
      return err
    }
  }

  useEffect(() => {
    ratingAdd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="recommend"
      onClick={(e) => {
        props.setOpen(false)
      }}
    >
      <div
        style={
          userOrRank === 0
            ? { height: '80vh', transition: '1s' }
            : {
                transition: '1s',
              }
        }
      >
        <div
          style={
            userOrRank === 0
              ? {
                  transform: 'scale(4)',
                  transition: '1s',
                  position: 'absolute',
                  top: '45%',
                  left: '43%',
                }
              : {
                  position: 'absolute',
                  top: '2%',
                  left: '2%',
                  transition: '1s',
                }
          }
        >
          <button
            className="myButton"
            style={{
              marginTop: '1%',
              borderRadius: '10px 0 0 10px',
              boxShadow: '20px 12px 30px -16px grey',
            }}
            onClick={(e) => {
              e.stopPropagation()
              setUserOrRank(1)
            }}
          >
            유저별
          </button>
          <button
            className="myButton"
            style={{
              borderRadius: '0 10px 10px 0',
              boxShadow: '-4px 12px 30px -16px grey',
              background: '#666',
              color: "#aaa",
            }}
            onClick={(e) => {
              e.stopPropagation()
              // setUserOrRank(2)
              alert("현재 solved.ac 기능 오류로 비활성화되었습니다.\n빠른 시일 내에 복구하갰습니다!")
            }}
          >
            랭크별
          </button>
        </div>
      </div>
      <div
        style={{
          opacity: userOrRank === 0 ? 0 : 1,
          transition: 'opacity 1s ease 0.5s',
        }}
      >
        {userOrRank === 0 ? (
          <></>
        ) : userOrRank === 1 ? (
          // 유저별 위치 =======================
          <div>
            <h1 style={{ 
              color: '#ffffff', 
              fontSize: '4vh',
              marginTop: '2vh',
              marginBottom: '-4vh',
              textShadow: '2px 2px 8px black',
              }}>
                유저별 추<span onClick={(e) => {
              e.stopPropagation()
              setUserOrRank(2)
            }}>천</span></h1>

            <div className="ratingProblem">
              <div
                className="similarStudent"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <div style={{ paddingBottom: '2%', color: '#ffffff' }}>
                    <span style={{ fontSize: '3vh',}}>
                      <span style={{ fontSize: '4vh', fontStyle: 'italic' }}>
                        {props.userName}
                      </span>
                      &nbsp;의 랭킹 테이블
                    </span>
                </div>
                <div className="similarStudentInner">
                  <div
                    className="p-head"
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      fontSize: '80%',
                      borderRadius: '5px 5px 0 0',
                    }}
                  >
                    <span>전체 랭킹</span>
                    <span>랭킹</span>
                    <span style={{ textAlign: 'center' }}>아이디</span>
                    <span>레이팅</span>
                    <span>CLASS</span>
                    <span>푼 문제</span>
                    <span>정답률</span>
                  </div>
                  {similarStudent &&
                    similarStudent.map((user, index) => (
                      <div
                        key={index}
                        className="p-head"
                        style={{
                          display: index < 5 ? 'block' : 'none',
                          position: 'relative',
                          background:
                            user.ID === props.userName
                              ? 'linear-gradient( to right, #ffd700d0, #ff7ca9d0 )'
                              : index % 2 === 0
                              ? '#ffffff'
                              : '#f0f0f0',
                        }}
                      >
                        <span>{user.worldrank}</span>
                        <span>{user.skhurank}</span>
                        <span>
                          <img
                            src={
                              'https://static.solved.ac/tier_small/' +
                              user.solvedrank +
                              '.svg'
                            }
                            alt="profile"
                            style={{
                              width: '1.2rem',
                              top: '0',
                              margin: '0 1% 0 0',
                              position: 'absolute',
                            }}
                          />{' '}
                          <strong
                            style={{
                              // verticalAlign: 'super',
                              marginLeft: '1.7rem',
                            }}
                          >
                            <a
                              href={'https://solved.ac/profile/' + user.ID}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {user.ID}
                            </a>
                          </strong>
                        </span>
                        <span>{user.rating}</span>
                        <span>{user.class}</span>
                        <span>{user.problems}</span>
                        <span>{user.correction}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className="recommendProblem"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <div style={{ position: 'sticky', top: '0px' }}>
                  <div style={{ paddingBottom: '1%' }}>
                    <strong>
                      <big>
                        <span
                          style={{
                            fontSize: '28pt',
                            fontStyle: 'italic',
                            color: '#ffffff',
                          }}
                        >
                          추천 문제
                        </span>
                      </big>
                    </strong>
                  </div>
                  <div
                    className="p-head"
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px 5px 0 0',
                    }}
                  >
                    <span> </span>
                  </div>
                </div>
                <div className="recommendProblemInner">
                  {ratingProblems &&
                    ratingProblems.map(
                      (problem, index) =>
                        index < 10 ? (
                          <ProCard
                            width={'80%'}
                            height={'25vh'}
                            fontSize={'xx-large'}
                            proColor={
                              30 - problem.solved_rank === 30
                                ? '#ffffff'
                                : props.COLORS[30 - problem.solved_rank]
                            }
                            proTier={problem.solved_rank}
                            proNum={problem.problem_id}
                            proName={problem.namekr}
                            proSum={problem.sum}
                          />
                        ) : null
                      // <div
                      //   key={index}
                      //   className="p-head"
                      //   style={{ position: 'relative' }}
                      // >
                      //   <a
                      //     key={index}
                      //     href={
                      //       'https://www.acmicpc.net/problem/' +
                      //       problem.PROBLEM_ID
                      //     }
                      //     style={{ textDecorationLine: 'none', color: '#000' }}
                      //     target="_blank"
                      //     rel="noopener noreferrer"
                      //   >
                      //     <span>{problem.PROBLEM_ID}</span>
                      //     <span>{problem.namekr}</span>
                      //     <span>{problem.sum}명 시도</span>
                      //     <img
                      //       src={
                      //         'https://static.solved.ac/tier_small/' +
                      //         problem.SOLVED_RANK +
                      //         '.svg'
                      //       }
                      //       alt="profile"
                      //       style={{
                      //         width: '1.2rem',
                      //         position: 'absolute',
                      //         margin: '0px 1% 0px 0px',
                      //         left: '0',
                      //         top: '0',
                      //       }}
                      //     />
                      //   </a>
                      // </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 랭크별 위치 ================================================
          <div>
            <h1 style={{ color: '#ffffff' }}>랭크별 문제</h1>
            {/* <span>
            <input type="text" />
            <button>search</button>
          </span> */}
            <div
              className="rankProblem"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div
                style={
                  aniChange
                    ? {
                        width: '80%',
                        margin: '-5% 10%',
                        transform: 'scale(0.5)',
                        transition: '1s',
                      }
                    : { width: '80%', margin: '0% 10%' }
                }
              >
                {rank.map((n, index) => (
                  <div key={index} className="rankButton">
                    <img
                      src={t[index]}
                      alt="profile"
                      style={{ width: '100%' }}
                      onClick={() => {
                        if (index !== 0) setAniChage(true)
                        setChecked(false)
                        index === 0 ? rankAdd(0) : rankSubAdd(index)
                      }}
                    />
                  </div>
                ))}
                {/* 서브 랭크 출력하는 구간 */}
                <Fade in={checked}>
                  <div className="subRank">{rankArray}</div>
                </Fade>
              </div>
              <div className="rankProblems">{rankProblem}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AlgoPage
