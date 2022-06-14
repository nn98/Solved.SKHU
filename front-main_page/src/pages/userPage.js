import React, { useCallback, useEffect, useState } from 'react'
import './user.css'
import { useLocation } from 'react-router-dom'
import { Collapse } from '@mui/material'
// import { NULL } from "mysql/lib/protocol/constants/types";

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'
// ============원형 차트 개발====================
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

const COLORS = [
  '#ff3071',
  '#ff0062',
  '#f5005a',
  '#ea0053',
  '#e0004c',
  '#41caff',
  '#2bbfff',
  '#00b4fc',
  '#00a9f0',
  '#009ee5',
  '#51fdbd',
  '#3ef0b1',
  '#27e2a4',
  '#00d497',
  '#00c78b',
  '#ffb028',
  '#f9a518',
  '#ec9a00',
  '#df8f00',
  '#d28500',
  '#4e6a86',
  '#496580',
  '#435f7a',
  '#3d5a74',
  '#38546e',
  '#c67739',
  '#b55d0a',
  '#ad5600',
  '#a54f00',
  '#9d4900',
]

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`EXP ${value
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

// ==========================================
const UserPage = (props) => {
  const location = useLocation()
  const [user, setUser] = useState({})
  const [userTag, setUserTag] = useState({})
  const [userTier, setUserTier] = useState([])
  const [opens, setOpens] = useState([false, false, false, false, false, false])
  const [userPro, setUserPro] = useState({})
  const [userZandi, setUserZandi] = useState([])
  const [circleChart, setCircleChart] = useState([])
  const [angleChart, setAngleChart] = useState([])
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

  function getDatesStartToLast(startDate, lastDate) {
    if (!(startDate instanceof Date && lastDate instanceof Date))
      return 'Not Date Object'
    var result = []
    var curDate = startDate
    while (curDate <= lastDate) {
      result.push({ date: curDate.toISOString().split('T')[0], count: 0 })
      curDate.setDate(curDate.getDate() + 1)
    }
    return result
  }

  const shiftDate = (date, numDays) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + numDays)
    return newDate
  }

  const userAdd = async () => {
    try {
      const t =
        location.state === null && props.globalID === ''
          ? 'q9922000'
          : location.state === null
          ? props.globalID
          : location.state.userId
      // console.log(t)
      // const pag = location.state !== null ? localStorage.state.userId : 'q9922000'
      // 잔디
      await fetch(
        'https://solved.ac/api/v3/user/history?handle=' +
          t +
          '&topic=solvedCount'
      )
        .then((res) => res.json())
        .then((data) => {
          let count = 1
          let list1 = getDatesStartToLast(
            shiftDate(new Date(), -365),
            new Date()
          )
          for (let i = 1; i <= data.length - 1; i++) {
            if (data[data.length - i].timestamp.slice(0, 10) <= list1[0].date)
              continue
            if (
              data[data.length - i].timestamp.substring(0, 10) ===
              data[data.length - 1 - i].timestamp.substring(0, 10)
            ) {
              // console.log(data[i].timestamp.substring(0,10)+" "+count)
              count++
            } else {
              list1[
                list1.findIndex(
                  (v) => v.date === data[data.length - i].timestamp.slice(0, 10)
                )
              ].count = count
              // list.push({
              //   date: data[data.length - i].timestamp.slice(0, 10),
              //   count: count,
              // })
              count = 1
            }
          }
          let todayCount = 1
          for (let i = 1; i <= data.length - 1; i++) {
            if (
              data[i].timestamp.slice(0, 10) === data[0].timestamp.slice(0, 10)
            )
              todayCount++
            else break
          }
          // list.push({ date: data[0].timestamp.slice(0, 10), value: 1 })
          list1[
            list1.findIndex((v) => v.date === data[0].timestamp.slice(0, 10))
          ].count = todayCount
          setUserZandi(list1)
        })
      // 태그 분포 api
      await fetch('https://solved.ac/api/v3/user/problem_tag_stats?handle=' + t)
        .then((res) => res.json())
        .then((data) => {
          let t = []
          // console.log(data.items.slice(0, 6))
          let sum = 0
          for (let i = 0; i < 6; i++) {
            t.push({
              subject: data.items[i].tag.key,
              // A: Math.ceil((data.items[i].exp / sum) * 100),
              A: data.items[i].exp,
              // A: angleData[i].A,
              // fullMark: 150,
            })
          }
          t.sort((x, y) => x.subject.localeCompare(y.subject))
          setUserTag(data)
          setAngleChart(t)
        })
      // user api
      await fetch('https://solved.ac/api/v3/user/show?handle=' + t)
        .then((res) => res.json())
        .then((data) => {
          setUser(data)
          // console.log(data)
        })
      // 문제 api
      await fetch(
        'https://solved.ac/api/v3/search/problem?query=solved_by%3A' +
          t +
          '&sort=level&direction=desc'
      )
        .then((res) => res.json())
        .then((data) => {
          setUserPro(data)
        })
      // 티어 api
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

          var circleData = []
          for (let i = 1; i < data.length; i++) {
            if (data[i].exp === 0) {
              let addData = {}
              addData.name = '?'
              addData.value = data[i].exp

              circleData.unshift(addData)
              continue
            }
            let addData = {}
            addData.name =
              tierData[parseInt((i - 1) / 5)].big_tear.substring(0, 1) +
              '' +
              (5 - ((i - 1) % 5))
            addData.value = data[i].exp

            circleData.unshift(addData)
          }
          // console.log(circleData)
          setCircleChart(circleData)

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

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )
  useEffect(() => {
    // console.log('location.state ' + location.state)
    // console.log('props.globalID ' + props.globalID)
    userAdd()
  }, [props.globalID, location.state])

  return (
    <div className="user">
      <div
        className="head"
        style={{
          background:
            user.tier === 31
              ? 'linear-gradient( to bottom, #7df7ffd0, #ff7ca9d0 )'
              : user.tier === 0
              ? '#343434d0'
              : COLORS[COLORS.length - user.tier] + 'd0',
        }}
      >
        <a
          href={
            'https://solved.ac/problems/level/' + (user.tier ? user.tier : 0)
          }
        >
          <img
            style={{
              width: '1.7rem',
              padding: '0 10px 0 0',
              verticalAlign: '-webkit-baseline-middle',
            }}
            src={
              'https://static.solved.ac/tier_small/' +
              (user.tier ? user.tier : 0) +
              '.svg'
            }
            alt="profile"
          />
        </a>
        <span
          style={{
            fontSize: '2em',
            fontWeight: 'bold',
            verticalAlign: 'bottom',
          }}
        >
          {props.globalID === ''
            ? location.state !== null
              ? location.state.userId
              : 'q9922000'
            : props.globalID}
        </span>
        <br />
        <hr style={{ margin: '8% 0' }} />
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
            startDate={shiftDate(new Date(), -365)}
            gutterSize={2}
            endDate={new Date()}
            values={userZandi}
            monthLabels={month}
            showWeekdayLabels={false}
            classForValue={(value) => {
              let c = 0
              if (!value) {
                return 'color-empty'
              } else {
                if (value.count === 0) c = 0
                else if (value.count >= 1 && value.count <= 2) c = 1
                else if (value.count >= 3 && value.count <= 6) c = 2
                else if (value.count >= 7 && value.count <= 11) c = 3
                else if (value.count >= 12) c = 4
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
          <div className="circleChart">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart width={800} height={350}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={circleChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#000"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  exp
                >
                  {circleChart.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <h1>test</h1>
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
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
                      style={{ width: '1.4rem' }}
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
          <div className="angleChart">
            <ResponsiveContainer width="100%" height={500}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={angleChart}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} />
                <Radar
                  dataKey="A"
                  stroke="#00c78b"
                  // fill="#8884d899"
                  fill="#88ffff55"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
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
                    <span id="user-color">{t.tag.displayNames[0].name}</span>
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
