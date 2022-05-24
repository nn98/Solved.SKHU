import React, { useEffect, useState } from 'react'
import './user.css'
import usersJ from './users.json'
import { useLocation } from 'react-router-dom'
import { Collapse } from '@mui/material'
// import { NULL } from "mysql/lib/protocol/constants/types";

const UserPage = () => {
  const location = useLocation()
  const save = usersJ
  const [user, setUser] = useState({})
  const [userTag, setUserTag] = useState({})
  const [userTier, setUserTier] = useState([])
  const [opens, setOpens] = useState([false, false, false, false, false, false])

  const userAdd = async () => {
    try {
      const t = location.state !== null ? location.state.userId : 'q9922000'
      await fetch(
        'https://solved.ac/api/v3/user/history?handle=' +
          t +
          '&topic=solvedCount'
      )
        .then((res) => res.json())
        .then((data) => {
          let count = 1
          let list = []
          for (let i = 1; i <= data.length - 1; i++) {
            if (
              data[data.length - i].timestamp.substring(0, 10) ===
              data[data.length - 1 - i].timestamp.substring(0, 10)
            ) {
              // console.log(data[i].timestamp.substring(0,10)+" "+count)
              count++
            } else {
              list.push({
                timestamp: data[data.length - i].timestamp.substring(0, 10),
                value: count,
              })
              count = 1
            }
          }
          list.push({ timestamp: data[0].timestamp.substring(0, 10), value: 1 })
          console.log(JSON.stringify(list))
        })
      await fetch('https://solved.ac/api/v3/user/problem_tag_stats?handle=' + t)
        .then((res) => res.json())
        .then((data) => {
          setUserTag(data)
          // console.log(data)
        })
      await fetch('https://solved.ac/api/v3/user/show?handle=' + t)
        .then((res) => res.json())
        .then((data) => {
          setUser(data)
          // console.log(data)
        })
      await fetch('https://solved.ac/api/v3/user/problem_stats?handle=' + t)
        .then((res) => res.json())
        .then((data) => {
          var tierData = [
            {
              big_tear: 'BRONZE',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              big_tear: 'SILVER',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              big_tear: 'GOLD',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              big_tear: 'PLATINUM',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              big_tear: 'DIAMOND',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              big_tear: 'RUBY',
              pSum: 0,
              eSum: 0,
              type: [],
            },
          ]
          let num = 0
          for (let i = 1; i < data.length; i++) {
            if (tierData[num].type.length === 5) {
              num++
            }
            tierData[num].pSum += data[i].solved
            tierData[num].eSum += data[i].exp
            tierData[num].type.push(data[i])
          }
          // console.log(tierData)
          setUserTier(tierData)
          // console.log(data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const onClickEnter = (tear) => {
    let open = [false, false, false, false, false, false]

    for (let i = 0; i < opens.length; i++) {
      open[i] = opens[i]
    }
    open[tear] = !open[tear]
    setOpens(open)
  }

  useEffect(() => {
    userAdd()
  }, [])

  return (
    <div className="user">
      <div className="head">
        <h1>
          {location.state ? location.state.userId : 'q9922000'}
          {/* <img
            style={{ width: '1.5%' }}
            src={'https://static.solved.ac/tier_small/' + user.tier + '.svg'}
            alt="profile"
          /> */}
        </h1>
        <h3>{user.solvedCount}문제 해결</h3>
      </div>
      <div className="use">
        <div className="tearTable">
          <p>난이도 분포</p>
          <div
            dangerouslySetInnerHTML={{ __html: save.solved_tear_chart }}
            style={{ width: '45%', float: 'left' }}
          ></div>
          <div className="teardata">
            <div>
              <div className="datahead">레벨</div>
              <div className="datahead">문제</div>
              <div className="datahead">EXP</div>
            </div>
            <hr />
            {userTier.map((BigTears, index) => (

              <div key={BigTears.big_tear}>
                <div onClick={() => onClickEnter(index)}>
                  <div className="BigTears">{BigTears.big_tear}</div>
                  <div className="BigTears">{BigTears.pSum}</div>
                  <div className="BigTears">{BigTears.eSum}</div>
                </div>
                <>
                  <Collapse in={opens[index]}>
                    {BigTears.type.map((tear, index2) => (
                      <div
                        key={tear.level}
                        style={{
                          display: opens[index] === false ? 'none' : 'revert',
                        }}
                      >
                        <div className="data">
                          {BigTears.big_tear.substr(0, 1)}
                          {5 - index2}
                        </div>
                        <div className="data">{tear.solved}</div>
                        <div className="data">{tear.exp}</div>
                      </div>
                    ))}
                  </Collapse>
                </>
              </div>
            ))}
          </div>
        </div>

        <div className="problem">
          <div
            className="p-head"
            style={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '5px 5px 0 0',
              position: 'sticky',
              top: '0px',
            }}
          >
            <span>#</span>
            <span>제목</span>
            <span>해결</span>
            <span>시도</span>
          </div>
          {save.user_problems.map((problem, index) => (
            <div key={index} className="p-head">
              <a
                key={index}
                href={'https://www.acmicpc.net/problem/' + problem}
                style={{ textDecorationLine: 'none', color: '#000' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{problem}</span>
                <span>제목</span>
                <span>해결</span>
                <span>{index * problem}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="tagTable">
          <p>태그 분포</p>
          <div
            dangerouslySetInnerHTML={{ __html: save.solved_tag_chart }}
            style={{ width: '60%', margin: '0% 0% 5% 20%' }}
          ></div>
          <div
            className="p-head"
            style={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '5px 5px 0 0',
              position: 'sticky',
              top: '0px',
              textAlign: 'center',
            }}
          >
            <span>태그</span>
            <span>문제</span>
            <span>EXP</span>
          </div>
          <div className="overScroll">
            {userTag.items &&
              userTag.items.map((t, index) =>
                t.solved === 0 ? null : (
                  <div key={index} className="p-head">
                    <span>{t.tag.displayNames[0].name}</span>
                    <span>{t.solved}</span>
                    <span>{t.exp}</span>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage
