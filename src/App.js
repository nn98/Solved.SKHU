import React from "react";
import "./App.css";
import "./pages/Front.css";
import { Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Assignments from "./pages/Assignments";
import Student from "./pages/Student";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/test" element={<Student />} />
    </Routes>
  );
}

export default App;
