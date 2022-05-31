import React, { useState, useEffect } from 'react'
import usersJ from './users.json'
import './rating.css'


const Rating = () => {
  // 랭크의 image를 출력하기 위한 번호
  const rank = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30],
  ]

  // 각 랭크의 서브 랭크를 넣기 위한 변수
  const [rankArray, setRankArray] = useState()

  // 유저 또는 랭크 별로 알고리즘을 받을지 결정하는 boolean 변수
  const [userOrRank, setUserOrRank] = useState(true)

  // 유저별 문제들을 저장하기 위한 변수
  const [ratingProblems, setRatingProblems] = useState([])

  // 랭크별 문제들을 저장하기 위한 변수
  const [rankProblems, setRankProblems] = useState([])

  // 유저별 문제 추천을 받기 위한 함수
  const ratingAdd = async () => {
    try {
      await fetch('http://localhost:3001/get')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setRatingProblems(data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  // 각 랭크의 서브 랭크의 버튼을 추가하기 위한 함수
  const rankSubAdd = (index) => {
    const result = []
    for (let i = 0; i < rank[index].length; i++) {
      result.push(
        <div key={i} className="rankButton">
          <button onClick={() => rankAdd(rank[index][i])}>
            <img
              src={
                'https://static.solved.ac/tier_small/' + rank[index][i] + '.svg'
              }
              alt="profile"
            />
          </button>
        </div>
      )
    }
    setRankArray(result)
  }

  // 랭크별 문제 추천을 받기 위한 함수
  const rankAdd = (index) => {
    try {
      let t = usersJ.user_problems.filter(
        (e, i) => i >= index * 10 && i <= index * 20
      )
      setRankProblems(t)
      console.log(rankProblems)
    } catch (err) {
      return err
    }
  }

  useEffect(() => {
    ratingAdd()
  }, [])

  return (
    <div className="rating">
      <button onClick={() => setUserOrRank(true)}>유저별</button>
      <button onClick={() => setUserOrRank(false)}>랭크별</button>
      {userOrRank ? (
        // 유저별 위치 =======================
        <div>
          <h1>문제 별 추천</h1>

          <div className="ratingProblem">
            <div className="mostProblem">
              <strong>
                <big>가장 많이 푼 문제</big>
              </strong>
              <div className="mostProblemInner">
                <div
                  className="p-head"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <span>#</span>
                  <span>제목</span>
                  <span>시도</span>
                </div>
                {ratingProblems.map((problem, index) => (
                  <div key={index} className="p-head">
                    <span>{problem.ID}</span>
                    <span>{problem.namekr}</span>
                    <span>{problem.rate}</span>
                  </div>
                ))}
              </div>
            </div>
            <strong>
              <big>가장 적게 푼 문제</big>
            </strong>
            <div className="minProblem">
              <div
                className="p-head"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '5px 5px 0 0',
                }}
              >
                <span>#</span>
                <span>제목</span>
                <span>시도</span>
              </div>
              {ratingProblems.map((problem, index) => (
                <div key={index} className="p-head">
                  <span>{problem.ID}</span>
                  <span>{problem.namekr}</span>
                  <span>{problem.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // 랭크별 위치 ================================================
        <div>
          <h1>랭크 페이지</h1>
          {/* <span>
            <input type="text" />
            <button>search</button>
          </span> */}
          <div className="rankProblem">
            <div className="rank">
              {rank.map((n, index) => (
                <div key={index} className="rankButton">
                  <button onClick={() => rankSubAdd(index)}>
                    <img
                      src={
                        'https://static.solved.ac/tier_small/' +
                        (index + 1) * 5 +
                        '.svg'
                      }
                      alt="profile"
                    />
                  </button>
                </div>
              ))}
              {/* 서브 랭크 출력하는 구간 */}
              <div className="subRank">{rankArray}</div>
            </div>
            <div className="rankProblems">
              {rankProblems.length !== 0 ? (
                <>
                  <div
                    className="p-head"
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px 5px 0 0',
                    }}
                  >
                    <span>#</span>
                    <span>제목</span>
                    <span>해결</span>
                    <span>시도</span>
                  </div>
                  {rankProblems.map((problem, index) => (
                    <div key={index} className="p-head">
                      <span>{problem}</span>
                      <span>제목</span>
                      <span>해결</span>
                      <span></span>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rating
