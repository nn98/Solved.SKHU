import Login from './login.js'
import Main from './main.js'
import SignUp from './signup.js'
import { Routes, Route } from 'react-router-dom'
import './styles/common2.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
