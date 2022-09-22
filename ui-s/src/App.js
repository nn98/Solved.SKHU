import React from "react";
import "./App.css";
import "./Front.css";
import { Routes, Route } from "react-router-dom";

import Main from "./Main";
import Student from "./Student";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/test" element={<Student />} />
    </Routes>
  );
}

export default App;
