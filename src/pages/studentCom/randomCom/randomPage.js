import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import randomBox from "./image/randomBox.json";
import BoxEffect from "./image/BoxEffect.json";
import ProCard from "../recoCom/proCard";
function RandomPage(props) {
  const [time, setTime] = useState(0);
  const [time2, setTime2] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setTime(1);
      console.log("5555");
    }, 1000);
    setTimeout(() => {
      setTime2(1);
      console.log("5555");
    }, 600);
  }, []);
  // var randomNo = (Math.floor)(Math.random()*24726+1000)
  return (
    <div>
      <div
        style={{
          position: "relative",
          // width: '100vw',
          height: "90vh",
          overflow: "hidden",
        }}
        onClick={(e) => {
          props.setOpen(false);
        }}
      >
        <Lottie
          loop={false}
          animationData={randomBox}
          style={{
            height: "100%",
            width: "30%",
            position: "absolute",
            left: "30%",
          }}
        />
        <Lottie
          loop={1}
          animationData={BoxEffect}
          style={{
            top: "-25vh",
            left: "10%",
            width: "70%",
            position: "absolute",
            opacity: `${time2}`,
            transition: "opacity 0.3s ease 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "40%",
            height: "100%",
            left: "25%",
            opacity: `${time}`,
            transition: "opacity 0.3s ease 0.3s",
          }}
        >
          <ProCard
            top={"25vh"}
            fontSize={"2rem"}
            proTier={"13"}
            proColor={"#ec9a00"}
            width={"100%"}
            height={"40%"}
          />
        </div>
      </div>
    </div>
  );
}

export default RandomPage;
