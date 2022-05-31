import React, { useEffect, useState } from 'react'
import './App.css'
import Footer from './footer'
import MainMenu from './mainMenu'
import MainPage from './pages/mainPage'
import QnA from './pages/QnA/QnA'
import UserPage from './pages/userPage'
import Algorithm from './pages/algorithm'
import Rating from './pages/rating'
import Rank from './pages/rank'
import Assignments from './pages/assignments'
import AssignDetail from './pages/assignDetail'
import Register from './pages/register'
import ProRegister from './pages/ProRegister'
import StudentRegister from './pages/StudentRegister'
// import { QnA } from './pages'
import { Routes, Route } from "react-router-dom";

function App() {
  // 랭킹 페이지 변수
  const [globalID, setGlobalID] = useState('')
  const [ranking, setRanking] = useState([])

  // 각 페이지 에서 필요한 정보 추가
  const add = async () => {
    try {
      await fetch("http://localhost:3001/ranking")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setRanking(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    add();
  }, []);
  return (
    <div className="root">
      <MainMenu />
      <Routes>
        <Route
          path="/"
          element={<MainPage globalID={globalID} setGlobalID={setGlobalID} />}
        />
        <Route
          path="/userPage"
          element={<UserPage globalID={globalID} setGlobalID={setGlobalID} />}
        />
        <Route path="/algorithm" element={<Algorithm />} />
        <Route
          path="/rating"
          element={<Rating globalID={globalID} setGlobalID={setGlobalID} />}
        />

        <Route path="/QnA" element={<QnA />} />
        <Route path="/rank" element={<Rank ranking={ranking} />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proRegister" element={<ProRegister />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/assignDetail" element={<AssignDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
