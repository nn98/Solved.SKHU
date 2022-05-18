import "./App.css";
import Footer from "./footer";
import MainMenu from "./mainMenu";
import MainPage from "./pages/mainPage";
import QnA from "./pages/QnA/QnA";
import UserPage from "./pages/userPage";
import Algorithm from "./pages/algorithm";
import Rating from "./pages/rating";
import Rank from "./pages/rank";
import Assignments from "./pages/assignments";
import AssignDetail from "./pages/assignDetail";
import Register from "./pages/register";
import ProRegister from "./pages/ProRegister";
import StudentRegister from "./pages/StudentRegister";
// import { QnA } from './pages'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <MainMenu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/algorithm" element={<Algorithm />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/QnA" element={<QnA />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proRegister" element={<ProRegister />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/assignDetail" element={<AssignDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
