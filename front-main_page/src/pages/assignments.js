import React, { useState, useEffect } from "react";
import "./assignments.css";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MediaCard from "./MUI/MediaCard";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import CopyRadioButtonsGroup from "./MUI/CopyRadioButtonsGroup";
import MultipleSelect from "./MUI/MultipleSelect";

const Assignments = () => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [pnumber, setPnumber] = useState();
  const [pdate, setPdate] = useState();
  const [copy, setCopy] = useState("");
  const [ID_LIST, setID_LIST] = useState();
  const [lecture, setLecture] = useState([]);
  const [student, setStudent] = useState([]);
  const [lectureName, setLectureName] = useState();

  const handleCopy = async () => {
    if (copy === "resultCopy") {
      let clipBoard = "";
      for (let i = 0; i < ID_LIST.length; ++i) {
        if (ID_LIST[i].Lecture_ID === subject)
          clipBoard += ID_LIST[i].result + "\n";
      }
      try {
        await navigator.clipboard.writeText(clipBoard);
        alert("클립보드에 복사 되었습니다!");
      } catch {
        alert("복사 실패!");
      }
    } else if (copy === "allCopy") {
      let clipBoard = "";
      for (let i = 0; i < ID_LIST.length; ++i) {
        if (ID_LIST[i].Lecture_ID === subject) {
          clipBoard += ID_LIST[i].ID + " ";
          clipBoard += ID_LIST[i].name + " ";
          clipBoard += ID_LIST[i].bojid + " ";
          clipBoard += ID_LIST[i].result + "\n";
        }
      }
      try {
        await navigator.clipboard.writeText(clipBoard);
        alert("클립보드에 복사 되었습니다!");
      } catch {
        alert("복사 실패!");
      }
    } else {
      alert("복사 옵션을 선택하세요.");
    }
  };

  const onClickStart = async (props) => {
    console.log("Notify: ", "LoadingButton Clicked!");
    try {
      setLoading(true);
      // 매개변수로 받은 JSON형태 데이터를 조건에 맞게 바꾸기 위해 다시 정의
      const sbody = {
        ID_LIST: props.ID_LIST,
        PID: props.pnumber,
        DeadLine: props.pdate,
      };
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: "POST", // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          "Content-Type": "application/json",
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(
          // 이 body에 해당하는 데이터를 서버가 받아서 처리합니다.
          sbody
        ),
      };
      // 이 URL은 exprees의 서버이기 때문에 3000번이 되어서는 안됨 충돌가능성이 있음, 뒤 서브스트링으로 구별
      await fetch("http://localhost:3001/assignments", requestOptions)
        .then(async (res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then(async (data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음

          console.log("Data: ", data);
          setStudent(data);
          setID_LIST(data);
          // setStudentList(JSON.stringify(data)); // 결과 JSON을 입력창에 문자형태로 출력
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const subjectAdd = async () => {
    try {
      await fetch("http://localhost:3001/assignments")
        .then((res) => res.json())
        .then((data) => {
          console.log("Lec:", data[0]);
          console.log("Stu:", data[1]);
          setLecture(data[0]);
          setStudent(data[1]);
          setID_LIST(data[1]);
          console.log("setLec:", lecture);
          console.log("setStu:", student);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    subjectAdd();
  }, []);

  return (
    <div className="assign">
      <h1>채점 페이지</h1>
      <MediaCard></MediaCard>
      <div className="input">
        <div
          className="p-head"
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px 5px 0 0",
            position: "sticky",
            top: "0px",
            textAlign: "center",
          }}
        >
          <span>{lectureName}</span>
          <span>학번</span>
          <span>이름</span>
          <span>아이디</span>
          <span>결과</span>
        </div>
        <div className="overScroll">
          {subject &&
            student.map((data, index) => (
              <>
                {subject === data.Lecture_ID ? (
                  <div key={data.ID} className="p-head">
                    <span>{lectureName}</span>
                    <span>{data.ID}</span>
                    <span>{data.name}</span>
                    <span>{data.bojid}</span>
                    <span>
                      {String(data.result) === "undefined"
                        ? ""
                        : String(data.result)}
                    </span>
                    {/* <input type="text" value={data} id={"ID"+index} ></input> */}
                  </div>
                ) : null}
              </>
            ))}
        </div>
      </div>

      <div className="buttonList">
        <h3 style={{ display: "inline-block", margin: "0% 15% 10% 0%" }}>
          강의 선택
        </h3>
        <Link to="/proRegister">
          <button
            style={{
              display: "inline-block",
              fontSize: "15px",
              borderRadius: "0%",
              border: "0",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            강의 등록하기
          </button>
        </Link>
        <MultipleSelect
          subject={subject}
          setSubject={setSubject}
          lecture={lecture}
          setLectureName={setLectureName}
        ></MultipleSelect>
        {subject !== ""
          ? lecture.map((data, index) => (
              <div key={data.ID}>
                {data.ID === subject ? (
                  <Paper
                    className="subPaper"
                    key={data.ID}
                    sx={{
                      display: "inline-block",
                      width: "83%",
                      marginBottom: "5%",
                    }}
                  >
                    <h3>과목코드 : {data.code}</h3>
                    <h3>교수명: {data.professor}</h3>
                    <h3>강의명 : {data.name}</h3>
                    <h3>분반 : {data.distribution}</h3>
                    <Link
                      to="/studentRegister"
                      state={[
                        { dataID: data.ID },
                        { lectureName: lectureName },
                      ]}
                    >
                      <button
                        style={{
                          display: "inline-block",
                          fontSize: "15px",
                          borderRadius: "0%",
                          border: "0px",
                          padding: "6px 12px",
                          margin: "0% 0% 3% 3%",
                          cursor: "pointer",
                        }}
                      >
                        학생 등록하기
                      </button>
                    </Link>
                  </Paper>
                ) : null}
              </div>
            ))
          : null}
        <h3>문제번호</h3>
        <input
          type="text"
          placeholder="문제번호"
          onChange={(e) => setPnumber(e.target.value)}
          value={pnumber || ""}
        ></input>
        <h3>제출기한</h3>
        <input
          type="date"
          onChange={(e) => setPdate(e.target.value)}
          value={pdate || ""}
        ></input>

        <LoadingButton
          size="small"
          color="inherit"
          onClick={() =>
            onClickStart({
              ID_LIST,
              pnumber,
              pdate,
            })
          }
          loading={loading}
          loadingIndicator="실행중..."
          variant="contained"
          sx={{ width: "67%" }}
        >
          <p>
            <PlayArrowIcon fontSize="small" />
            검사 실행
          </p>
        </LoadingButton>
        <CopyRadioButtonsGroup
          copy={copy}
          setCopy={setCopy}
        ></CopyRadioButtonsGroup>
        <Button
          size="small"
          color="inherit"
          onClick={() => {
            handleCopy();
          }}
          variant="contained"
        >
          <p>
            <ContentCopyIcon fontSize="small" />
            결과 복사하기
          </p>
        </Button>
      </div>
    </div>
  );
};

export default Assignments;
