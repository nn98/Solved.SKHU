import React from 'react'
import './App.css'
import './pages/Front.css'
import { Routes, Route } from 'react-router-dom'

import Main from './pages/Main'
import Assignments from './pages/Assignments'
import Student from './pages/Student'

function App() {
  const serverAddress = 'http://sol-skhu.duckdns.org:3001'

  return (
    <div className="rr">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/assignments"
          element={<Assignments serverAddress={serverAddress} />}
        />

        <Route
          path="/test"
          element={<Student serverAddress={serverAddress} />}
        />
      </Routes>
    </div>
  )
}

export default App
