import React, { useState } from 'react'
import usersJ from './users.json'
import './rating.css'

const Rating = () => {
  const [problems, setProblems] = useState([])

  const add = () => {
    try {
      setProblems(usersJ)
      console.log(problems)
    } catch (err) {
      return err
    }
  }

  return (
    <div className="rating">
      <h1>레이팅 페이지</h1>
      <span>
        <input type="text" />
        <button onClick={() => add()}>search</button>
      </span>

      <div className="problem">
        {problems.length !== 0 ? (
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
            {problems.user_problems.map((problem, index) => (
              <div key={index} className="p-head">
                <span>{problem}</span>
                <span>제목</span>
                <span>해결</span>
                <span>{index * problem}</span>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Rating
