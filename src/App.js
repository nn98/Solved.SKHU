import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Main from './pages/Main'
import Assignments from './pages/Assignments'
import Student from './pages/Student'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

function App({ children }) {
  const serverAddress = 'https://sol-skhu.duckdns.org:3002'

  return (
    <div className="rr" style={{ overflow: 'auto' }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/assignments"
          element={<Assignments serverAddress={serverAddress} />}
        />

        <Route
          path="/Student"
          element={<Student serverAddress={serverAddress} />}
        />
      </Routes>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </div>
  )
}

export default App
