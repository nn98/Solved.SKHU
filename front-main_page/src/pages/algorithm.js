import React, { useState, useEffect } from 'react'
import './algorithm.css'
// import usersJ from './users.json'
import Grow from '@mui/material/Grow'
import { textAlign } from '@mui/system'

const Algorithm = () => {
  const [recommend, setRecommend] = useState([])
  const [name, setName] = useState([
    {
      name:"가장 많이 푼 문제"
    },{
      name:"가장 적게 푼 문제"
    },{
      name:" 성공률 상위 10"
    },{
      name:"성공률 하위 10"
    }
  ])

  const [opens, setOpens] = useState([
    false,
    false,
    false,
    false,
  ])

const TopAlgorithm = async () => {
  try {
    const best = await fetch('http://localhost:3001/BestAlgorithm')
      .then((res) => res.json())
    const worst = await fetch('http://localhost:3001/WorstAlgorithm')
      .then((res) => res.json())
    const max = await fetch('http://localhost:3001/MaxAlgorithm')
      .then((res) => res.json())
    const min = await fetch('http://localhost:3001/MinAlgorithm')
      .then((res) => res.json())
      
    // console.log([most,min]);  
    setRecommend([max,min,best,worst])
  } catch (error) {
    console.error(error)
  }}

  const onClickEvente = (index) => {
    let open = [false, false, false, false]

    open[index] = !open[index]
    console.log(open);
    setOpens(open)
  }

  const onClickReco = () => {
    alert('백준으로 연결')
  }

  useEffect(() => {
    TopAlgorithm()
  }, [])

  return (
    <div className="Algo">
      <h1>
        성공회대학교<span className="subTitle"> 의 카테고리 별 알고리즘</span>
      </h1>
      <div className="user">
        {name.map((data, index) =>
          index < 4 ? (
            <button
              className="userAlgo"
              key={index}
              onClick={() => onClickEvente(index)}
            >
              {data.name}
            </button>
          ) : null
        )}
      </div>
      <div className="reco">
        {opens.map((value, index) => (
          <Grow
            in={opens[index]}
            key={index}
            {...(opens[index] ? { timeout: 1000 } : {})}
          >
            <div
              key={index}
              style={{ display: opens[index] === false ? 'none' : 'revert' }}
            >
              {recommend[index] && recommend[index].map((data, index2) =>
                index2 < 7 ? (
                  <button
                    className="recoAlgo"
                    key={index2}
                    onClick={() => onClickReco()}
                  >
                    <a
                      key={data.ID} 
                      href={'https://www.acmicpc.net/problem/'+data.ID}
                      style={{ textDecorationLine: 'none', color: '#000' }}
                      target="_blank"
                      rel="noopener noreferrer">
                    <span style={{float : 'left'}}><img src={'https://static.solved.ac/tier_small/'+(data.SOLVED_RANK)+'.svg'} alt="profile" style= {{width : "1.3rem"}}/></span>
                    {/* <span>{data.ID} {data.namekr}</span> */}
                    <span>{data.ID}</span>
                    <span>{data.namekr}</span>
                    {/* <span>{data.rate}</span> */}
                    {/* <span>{data.sum}</span> */}
                     </a>
                  </button>
                ) : null
              )}
            </div>
          </Grow>
        ))}
      </div>
    </div>
  )
  
}
export default Algorithm