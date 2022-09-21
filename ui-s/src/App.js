import React, { useState } from "react";
import "./App.css";
import "./Front.css";

function App() {
  const [stuStyle, setStuStyle] = useState({});
  const [butStyle, setButStyle] = useState({});

  const proClick = () => {
    setStuStyle({ transform: "translate(50%)", transition: "1s" });
    setButStyle({ opacity: "0", transition: "0.5s" });
  };

  const stuClick = () => {
    setStuStyle({
      transform: "translate(-50%)",
      transition: "1s",
    });
    setButStyle({ opacity: "0", transition: "0.5s" });
  };

  return (
    <div className="front_div">
      <button className="pro_but" style={butStyle} onClick={() => proClick()}>
        교수용
      </button>
      <button className="stu_but" style={butStyle} onClick={() => stuClick()}>
        학생용
      </button>
      <div className="pro_div"></div>
      <div className="stu_div" style={stuStyle}></div>
    </div>
  );
}

export default App;
