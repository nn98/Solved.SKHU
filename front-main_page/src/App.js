import "./App.css";
import Footer from "./footer";
import MainMenu from "./mainMenu";
import MainPage from "./pages/mainPage";
import QnA from "./pages/QnA";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <MainMenu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/QnA" element={<QnA />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
