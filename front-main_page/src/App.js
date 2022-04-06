
import "./App.css";
import Footer from "./footer";
import MainMenu from "./mainMenu";
import MainPage from "./pages/mainPage";
import QnA from "./pages/QnA";
import UserPage from "./pages/userPage";
import Algorithm from "./pages/algorithm";
import Rank from "./pages/rank";
import Professor from "./pages/professor";
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
        <Route path="/professor" element={<Professor />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
