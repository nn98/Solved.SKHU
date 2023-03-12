import { useState, useEffect } from "react";

import { TextField, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";

import { keyframes } from "@emotion/react";

import StudentInfo from "./studentCom/StudentInfo";
// import Ranking from "./studentCom/rankCom/rank";

import stbg from "./studentCom/userCom/image/STBG.png";
import {bgBG} from "@mui/material/locale";

const searchMove1 = keyframes`
  from {left: 20vw; top: 45vh; width: 60%; }
  to {left: 2vw; top: 2vh; width: 20%; }`;
const searchMove2 = keyframes`
from {width: 90%; px: 2.9; py: 2;}
to {width: 80%; px: 1; py: 2;}`;
const fadein = keyframes`
  from {opacity: 0; }
  to {opacity: 1; }`;
const fadeout = keyframes`
from {opacity: 1; }
to {opacity: 0; }`;

function Student(props) {
  const [change, setChange] = useState(false);
  const [userName, setUserName] = useState("");

  const [ranking, setRanking] = useState([]);
  const [recommend, setRecommend] = useState([]);

  // console.log('serverAddress', props.serverAddress)

  const userCheck = async () => {
    if (userName === "") {
      alert("백준 아이디를 입력해주세요");
      return;
    }
    const requestOptions = {
      // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
      method: "POST", // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
      headers: {
        "Content-Type": "application/json",
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify(
        // 이 body에 해당하는 데이터를 서버가 받아서 처리합니다.
        {
          ID: userName,
        }
      ),
    };
    try {
      await fetch(props.serverAddress + "/userCheck", requestOptions)
        .then(async (res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then(async (data) => {
          // console.log(data)
          // console.log(data.find((x) => x.ID === userName))
          if (data.find((x) => x.ID === userName) === undefined) {
            alert("입력하신 ID는 성공회대학교에 등록되지 않았습니다. ");
            return;
          }
          if (change) alert(userName + "님 어서오세요");
          setChange(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------UseEffect------------------------------
  useEffect(() => {
    const add = async () => {
      try {
        await fetch(props.serverAddress + "/ranking")
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            setRanking(data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    const topAlgorithm = async () => {
      try {
        const best = await fetch(props.serverAddress + "/BestAlgorithm").then(
          (res) => res.json()
        );
        const worst = await fetch(props.serverAddress + "/WorstAlgorithm").then(
          (res) => res.json()
        );
        const max = await fetch(props.serverAddress + "/MaxAlgorithm").then(
          (res) => res.json()
        );
        const min = await fetch(props.serverAddress + "/MinAlgorithm").then(
          (res) => res.json()
        );

        // console.log([most,min]);
        setRecommend([max, min, best, worst]);
        // console.log([max, min, best, worst])
      } catch (error) {
        console.error(error);
      }
    };

    add();
    topAlgorithm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        // backgroundColor: 'greenyellow',

        backgroundImage: `url(${stbg})`,
        backgroundSize: "cover",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="test" style={{ animation: `${fadein} 0.5s` }}>
        <Box
          sx={Object.assign(
            change
              ? {
                  left: "2vw",
                  top: "2vh",
                  width: "20%",
                  animation: `${searchMove1} 1s`,
                }
              : {
                  left: "20vw",
                  top: "45vh",
                  width: "60%",
                },
            {
              position: "absolute",
              backgroundColor: "#F2F2F2",
              borderRadius: 25,
              textAlign: "center",
              boxShadow: "2px 8px 20px -12px #bdbdbd",
            }
          )}
        >
          <TextField
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                userCheck();
              }
            }}
            autoComplete="off"
            variant="standard"
            id="User_ID"
            placeholder="Solved.ac ID 입력"
            sx={
              change
                ? { width: "80%", px: 1, py: 1, animation: `${searchMove2} 1s` }
                : { width: "90%", px: 2.9, py: 2 }
            }
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={() => {
                      userCheck();
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
          <Box style={{
              textAlign: 'center',
              backgroundColor: `#00000055`,
              backgroundSize: "cover",
              width: "25vh",
              height: "6vh",
              verticalAlign: 'middle',
              color: "#fff",
              fontFamily: "doHyeon",
              fontSize: '2.2vw',
              position: 'absolute',
              left: '40vw',
              top: '52vh',
              alignContent: 'revert',
              padding: '1vw',
              boxShadow: '0px 0px 40px -15px #eee',
          }}
          onClick={() => {
              setUserName('q9922000');
          }}
               sx={Object.assign(
                   change ? {
                       animation: `${fadeout} 0.5s`,
                       visibility: 'hidden',
                   } : {

                   }
                   )}>

              <span style={{

              }}>
                  성공회대 학생이 아니신가요?
              </span>
              <br/>
              <span style={{
                  color: "#aaa",
                  fontSize: '1.8vw',

              }}>
                  개발자 아이디로 테스트
              </span>
          </Box>
      </div>
      {change ? (
        <StudentInfo
          userName={userName}
          ranking={ranking}
          serverAddress={props.serverAddress}
          recommend={recommend}
        />
      ) : (
        <></>
      )}


    </div>
  );
}

export default Student;
