import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import stbg from "./studentCom/userCom/image/STBG.png";
import pfbg from "./studentCom/userCom/image/PFBG.png";
// import pfbg from './proffessorCom/image/bg01.png'

function Main() {
  const [proBG, setProBG] = useState(false);
  const [stuStyle, setStuStyle] = useState({});
  const [butStyle, setButStyle] = useState({});
  const navigate = useNavigate();
  const proClick = () => {
    setStuStyle({ transform: "translate(50%)", transition: "1s" });
    setButStyle({ opacity: "0", transition: "0.5s" });

    setTimeout(function () {
      setProBG(true);
      setTimeout(function () {
        navigate("/assignments");
      }, 500);
    }, 1000);
  };
  const stuClick = () => {
    setStuStyle({
      transform: "translate(-50%)",
      transition: "1s",
    });
    setButStyle({
      opacity: "0",
      transition: "0.5s",
    });

    setTimeout(function () {
      navigate("/Student");
    }, 1000);
  };

  return (
    <div style={{ touchAction: "none" }}>
      <ProButton
        style={butStyle}
        onClick={() => {
          proClick();
        }}
      >
        TA
      </ProButton>
      <StuButton style={butStyle} onClick={() => stuClick()}>
        학생
      </StuButton>
      <ProDiv>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#000000",
            opacity: proBG ? 0.2 : 0,
            transition: "opacity 0.3s",
          }}
        ></div>
      </ProDiv>
      <StuDiv style={stuStyle}></StuDiv>
    </div>
  );
}
export default Main;

// Front.css
const ProButton = styled.button`
  background-color: #00000000;
  border: 4px solid white;
  color: white;
  font-family: doHyeon;
  font-size: 3.5vh;
  width: 14%;
  height: 5.3%;
  position: absolute;
  top: 45%;
  left: 18%;
  z-index: 3;
  &:hover {
    background-color: #ffffffee;
    color: #000;
    border-image: linear-gradient(
      to right,
      rgb(86, 239, 86) 0%,
      rgb(106 157 228) 100%
    );
    border-image-slice: 1;
    transition: 1s;
  }
`;
const StuButton = styled.button`
  background-color: #00000000;
  border: 4px solid white;
  color: white;
  font-family: doHyeon;
  font-size: 3.5vh;
  width: 14%;
  height: 5.3%;
  position: absolute;
  top: 45%;
  right: 18%;
  z-index: 3;
  &:hover {
    background-color: #00000077;
    border-image: linear-gradient(to right, red 0%, orange 100%);
    border-image-slice: 1;
    transition: 1s;
  }
`;
const ProDiv = styled.div`
  z-index: 1;
  width: 100%;
  height: 100vh;
  background-image: url(${pfbg});
  background-size: cover;
  position: absolute;
`;
const StuDiv = styled.div`
  width: 100%;
  height: 100vh;
  left: 50%;
  background-image: url(${stbg});
  background-size: cover;
  position: absolute;
  z-index: 1;
`;
