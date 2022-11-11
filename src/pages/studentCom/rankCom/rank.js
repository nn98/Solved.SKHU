// import React, { useEffect, useState } from 'react'
// import rankJ from './rank.json'
import './rank.css'
// import { Link } from 'react-router-dom'

const Rank = (props) => {
  return (
    <div
      onClick={(e) => {
        props.setOpen(false)
      }}
    >
      <div className="rank">
        <h1 style={{ textAlign: 'center', color: '#ffffff' }}>
          성공회대학교 랭킹
        </h1>
        {/* <div style={{ display: 'inline', float: 'right' }}>
        <h3 style={{ display: 'inline-block', paddingRight: '10px' }}>
          명단에 없을 경우 :{' '}
        </h3>
        <Link to="/register">
          <button
            style={{
              display: 'inline-block',
              fontSize: '15px',
              borderRadius: '0%',
              border: '0',
              padding: '6px 12px',
              cursor: 'pointer',
            }}
          >
            등록하기
          </button>
        </Link>
      </div> */}
        <div className="rankTable" onClick={(e) => e.stopPropagation()}>
          <table>
            <thead>
              <tr>
                <th>전체 랭킹</th>
                <th>랭킹</th>
                <th>아이디</th>
                <th>레이팅</th>
                <th>CLASS</th>
                <th>푼 문제</th>
                <th>정답률</th>
              </tr>
            </thead>
            <tbody>
              {props.ranking.map((user, index) => (
                <tr
                  key={index}
                  style={{
                    background:
                      props.userName === user.ID
                        ? 'linear-gradient(to right, rgba(255, 215, 0, 0.816), rgba(255, 124, 169, 0.816))'
                        : '',
                    boxShadow:
                      props.userName === user.ID ? '0 0 0 3px rgb(86, 255, 86) inset' : '',
                  }}
                >
                  <td>{user.worldrank}</td>
                  <td>{user.skhurank}</td>
                  <td>
                    <img
                      src={
                        'https://static.solved.ac/tier_small/' +
                        user.solvedrank +
                        '.svg'
                      }
                      alt="profile"
                      style={{ width: '3%', margin: '0 1% 0 0' }}
                    />{' '}
                    <strong style={{ verticalAlign: 'super' }}>
                      <a
                        href={'https://solved.ac/profile/' + user.ID + '#'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.ID}
                      </a>
                    </strong>
                  </td>
                  <td>{user.rating}</td>
                  <td>{user.class}</td>
                  <td>{user.problems}</td>
                  <td style={{ textAlign: 'center' }}>{user.correction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Rank
