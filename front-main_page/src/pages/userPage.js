import React, { useEffect, useState } from 'react'
import './user.css'
import usersJ from './users.json'
import { useLocation } from 'react-router-dom'
import { Collapse } from '@mui/material'
// import { NULL } from "mysql/lib/protocol/constants/types";

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'

const UserPage = (props) => {
  const location = useLocation()
  const save = usersJ
  const [user, setUser] = useState({})
  const [userTag, setUserTag] = useState({})
  const [userTier, setUserTier] = useState([])
  const [opens, setOpens] = useState([false, false, false, false, false, false])
  const [userPro, setUserPro] = useState({})
  const [userZandi, setUserZandi] = useState([])
  const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ]
  const userAdd = async () => {
    try {
      console.log("userAdd");
      const t =
        props.globalID === ''
          ? location.state !== null
            ? location.state.userId
            : 'q9922000'
          : props.globalID
      // const pag = location.state !== null ? localStorage.state.userId : 'q9922000'
      // 잔디
      await fetch(
        'https://solved.ac/api/v3/user/history?handle=' +
          t +
          '&topic=solvedCount'
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("fetch");
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
                date: data[data.length - i].timestamp.slice(0, 10),
                count: count,
              })
              count = 1
            }
          }
          list.push({ timestamp: data[0].timestamp.slice(0, 10), value: 1 })
          // console.log(JSON.stringify(list))
          console.log(list)
          setUserZandi(list)
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
      await fetch(
        'https://solved.ac/api/v3/search/problem?query=solved_by%3A' +
          t +
          '&sort=level&direction=desc'
      )
        .then((res) => res.json())
        .then((data) => {
          setUserPro(data)
        })
      await fetch('https://solved.ac/api/v3/user/problem_stats?handle=' + t)
        .then((res) => res.json())
        .then((data) => {
          var tierData = [
            {
              style: 'rgb(163,92,33)',
              big_tear: 'BRONZE',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              style: 'rgb(74,94,120)',
              big_tear: 'SILVER',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              style: 'rgb(225,161,62)',
              big_tear: 'GOLD',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              style: 'rgb(112,223,170)',
              big_tear: 'PLATINUM',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              style: 'rgb(85,179,246)',
              big_tear: 'DIAMOND',
              pSum: 0,
              eSum: 0,
              type: [],
            },
            {
              style: 'rgb(235,56,104)',
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
    console.log(props.globalID)
    userAdd()
  }, [location.state, props.globalID])

  return (
    <div className="user">
      <div className="head">
        <span style={{ width: '10vh', margin: '1%' }}>
          <a
            href={
              'https://solved.ac/problems/level/' + (user.tier ? user.tier : 0)
            }
          >
            <img
              style={{ width: '1.7rem', padding: '0 10px 0 0' }}
              src={
                'https://static.solved.ac/tier_small/' +
                (user.tier ? user.tier : 0) +
                '.svg'
              }
              alt="profile"
            />
          </a>
        </span>
        <span style={{ fontSize: '2em', fontWeight: 'bold' }}>
          {props.globalID === ''
            ? location.state !== null
              ? location.state.userId
              : 'q9922000'
            : props.globalID}
        </span>
        <br />

        <span
          style={{
            width: '10%',
            margin: user.solvedCount ? '1%' : '2.1%',
            fontSize: '1.5em',
            fontWeight: 'bold',
          }}
        >
          {user.solvedCount}
        </span>
        <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>문제 해결</span>
      </div>
      <div className="use">
        <div className="zandi">
          <CalendarHeatmap
            startDate={new Date('2022-01-01')}
            endDate={new Date('2022-12-31')}
            values={userZandi}
            monthLabels={month}
            showWeekdayLabels={false}
            classForValue={(value) => {
              let c = 0
              if (!value) {
                return 'color-empty'
              } else {
                if (value.count >= 1 && value.count <= 4) c = 1
                else if (value.count >= 5 && value.count <= 9) c = 2
                else if (value.count >= 10 && value.count <= 14) c = 3
                else if (value.count >= 15) c = 4
              }
              return `color-beammp-${c}`
            }}
            tooltipDataAttrs={(value) => {
              return { 'data-tip': `${value.date} ${value.count}문제` }
            }}
          />
          <ReactTooltip />
        </div>
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
                  <div
                    className="BigTears"
                    style={{ color: BigTears.style, fontWeight: 'bold' }}
                  >
                    {BigTears.big_tear}
                  </div>
                  <div className="BigTears" id="pro-color">
                    {BigTears.pSum}
                  </div>
                  <div className="BigTears" id="user-color">
                    {BigTears.eSum}
                  </div>
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
                        <div
                          className="data"
                          style={{ color: BigTears.style, fontWeight: 'bold' }}
                        >
                          {BigTears.big_tear.substr(0, 1)}
                          {5 - index2}
                        </div>
                        <div className="data" id="pro-color">
                          {tear.solved}
                        </div>
                        <div className="data" id="user-color">
                          {tear.exp}
                        </div>
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
            className="pr-head"
            style={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '5px 5px 0 0',
              position: 'sticky',
              top: '0px',
            }}
          >
            <span></span>
            <span>#</span>
            <span>제목</span>
            <span>해결</span>
            <span>평균 시도</span>
          </div>
          {userPro.items &&
            userPro.items.map((problem, index) => (
              <div key={problem.problemId} className="pr-head">
                <a
                  key={index}
                  href={'https://www.acmicpc.net/problem/' + problem.problemId}
                  style={{ textDecorationLine: 'none', color: '#000' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <img
                      src={
                        'https://static.solved.ac/tier_small/' +
                        problem.level +
                        '.svg'
                      }
                      alt="profile"
                      style={{ width: '1rem' }}
                    />
                  </span>
                  <span id="user-color">{problem.problemId}</span>
                  <span id="user-color">{problem.titleKo}</span>
                  <span id="user-color">{problem.acceptedUserCount}</span>
                  <span id="user-color">{problem.averageTries.toFixed(2)}</span>
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
                    <span style={{ fontWeight: 'bold' }}>
                      {t.tag.displayNames[0].name}
                    </span>
                    <i>
                      <span id="user-color">{t.solved}</span>
                    </i>
                    <span id="user-color">{t.exp}</span>
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
