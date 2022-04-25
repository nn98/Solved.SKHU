import React from 'react'
import rankJ from './rank.json'
import './rank.css'

const rank = () => {
  return (
    <div className="rank">
      <h1>성공회대학교 티어 랭킹</h1>
      <div className="rankTable">
        <table>
          <thead>
            <tr>
              <th>전체 랭킹</th>
              <th>랭킹</th>
              <th>아이디</th>
              <th>레이팅</th>
              <th>CLASS</th>
              <th>푼 문제</th>
            </tr>
          </thead>
          <tbody>
            {rankJ.rank.map((user) => (
              <tr key={user.Id}>
                <td>{user.wordRank}</td>
                <td>{user.skhuRank}</td>
                <td>
                  <img
                    src={'https://static.solved.ac/tier_small/' + 5 + '.svg'}
                    alt="profile"
                    style={{ width: '2%', margin: '0 1% 0 0' }}
                  />{' '}
                  <strong>
                    <a href="https://solved.ac/profile/{user.Id}">{user.Id}</a>
                  </strong>
                </td>
                <td>{user.Rating}</td>
                <td>{user.CLASS}</td>
                <td>{user.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default rank
