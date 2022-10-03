import React, { useEffect, useState } from 'react'
import './App.css'
import './pages/Front.css'
import { Routes, Route } from 'react-router-dom'

import Main from './pages/Main'
import Student from './pages/Student'

function App() {
  const serverAddress = 'http://sol-skhu.duckdns.org:3001'
  const [ranking, setRanking] = useState([])
  const [recommend, setRecommend] = useState([])
  useEffect(() => {
    const add = async () => {
      try {
        await fetch(serverAddress + '/ranking')
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            setRanking(data)
          })
      } catch (error) {
        console.error(error)
      }
    }

    const topAlgorithm = async () => {
      try {
        const best = await fetch(serverAddress + '/BestAlgorithm').then((res) =>
          res.json()
        )
        const worst = await fetch(serverAddress + '/WorstAlgorithm').then(
          (res) => res.json()
        )
        const max = await fetch(serverAddress + '/MaxAlgorithm').then((res) =>
          res.json()
        )
        const min = await fetch(serverAddress + '/MinAlgorithm').then((res) =>
          res.json()
        )

        // console.log([most,min]);
        setRecommend([max, min, best, worst])
        // console.log([max, min, best, worst])
      } catch (error) {
        console.error(error)
      }
    }

    add()
    topAlgorithm()
  }, [])
  return (
    <div className="rr">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/test"
          element={
            <Student
              serverAddress={serverAddress}
              ranking={ranking}
              recommend={recommend}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
