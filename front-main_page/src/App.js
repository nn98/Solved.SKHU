import "./App.css";
import Footer from "./footer";
import MainMenu from "./mainMenu";
import MainPage from "./pages/mainPage";
import QnA from "./pages/QnA/QnA";
import UserPage from "./pages/userPage";
import Algorithm from "./pages/algorithm";
import Rank from "./pages/rank";
import Assignments from "./pages/Assignments";
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
        <Route path="/QnA" element={<QnA />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
