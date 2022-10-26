import React, { useState, useEffect } from "react";
import "./proffessorCom/Assignments.css";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import MediaCard from "./proffessorCom/MUI/MediaCard";
import Paper from "@mui/material/Paper";
import CopyRadioButtonsGroup from "./proffessorCom/MUI/CopyRadioButtonsGroup";
import MultipleSelect from "./proffessorCom/MUI/MultipleSelect";
import MaxWidthDialog from "./proffessorCom/MUI/MaxWidthDialog";
import bg from "./proffessorCom/image/bg01.png";
import ProRegister from "./proffessorCom/ProRegister";
import StudentRegister from "./proffessorCom/StudentRegister";
import { Dialog } from "@mui/material";

// import plusGreen from "./proffessorCom/image/plus_green.gif";
import TextField from "@mui/material/TextField";
import MaterialUIPickers from "./proffessorCom/MUI/MaterialUIPickers";
import Lottie from "lottie-react";
import plusGreen from "./proffessorCom/image/plus_green.json";
import copyGif from "./proffessorCom/image/copy.gif";
import gauge from "./proffessorCom/image/gauge.gif";
import gg from "./proffessorCom/image/gauge.png";
import submit from "./proffessorCom/image/submit2.gif";
import sb from "./proffessorCom/image/sb.png";
import sb_d from "./proffessorCom/image/sb_disable.png";
import cp from "./proffessorCom/image/copy.png";

const Assignments = (e) => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [pnumber, setPnumber] = useState();
  const [pdate, setPdate] = useState();
  const [reAssignment, setReAssignment] = useState(false);
  const [copy, setCopy] = useState("");
  const [ID_LIST, setID_LIST] = useState();
  const [lecture, setLecture] = useState([]);
  const [student, setStudent] = useState([]);
  const [lectureName, setLectureName] = useState();
  const [processing, setProcessing] = useState();

  const [open, setOpen] = useState(false);
  const [detailID, setDetailID] = useState();

  const [sideOpen, setSideOpen] = useState(true);
  const [sideStyle, setSideStyle] = useState({});
  const [arrowStyle, setArrowStyle] = useState({});

  const [proOpen, setProOpen] = useState(false);
  const [stuOpen, setStuOpen] = useState(false);
  const [serverAddress, setServerAddress] = useState(e.serverAddress);

  const [submitController, setSubmitController] = useState(false);
  const [copyController, setCopyController] = useState(false);
  const [gaugeController, setGaugeController] = useState(false);

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
        return;
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
        return;
      }
    } else {
      alert("복사 옵션을 선택하세요.");
      return;
    }
    setCopyController(true);
    setTimeout(() => {
      setCopyController(false);
    }, 1960);
  };

  const onClickStart = async (props) => {
    // console.log("Notify: ", "LoadingButton Clicked!");
    let LIST = [];
    let cnt = 0;
    for (let i = 0; i < props.ID_LIST.length; ++i) {
      if (props.ID_LIST[i].Lecture_ID === subject)
        LIST[cnt++] = props.ID_LIST[i];
    }
    // console.log(LIST);
    try {
      console.log("assignment begin", e.serverAddress);
      setLoading(true);
      setGaugeController(true);
      // 매개변수로 받은 JSON형태 데이터를 조건에 맞게 바꾸기 위해 다시 정의
      const sbody = {
        ID_LIST: LIST,
        PID: props.pnumber,
        DeadLine: props.pdate,
        reAssignment: props.reAssignment,
      };
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: "POST", // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          "Content-Type": "application/json",
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(
          sbody // 이 body에 해당하는 데이터를 서버가 받아서 처리합니다.
        ),
      };
      // 이 URL은 exprees의 서버이기 때문에 3000번이 되어서는 안됨 충돌가능성이 있음, 뒤 서브스트링으로 구별
      await fetch(e.serverAddress + "/assignments", requestOptions)
        .then(async (res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then(async (result) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          console.log("assignment fin, set Results", e.serverAddress);
          console.log("Result: ", result);
          let compare = student;
          let data = result.result;
          // console.log(compare);
          // console.log("Data[0][0]: ", data[0][0]);
          // console.log("Data[0][0].ID: ", data[0][0].ID);
          // console.log("Compare: ", compare);
          for (let i = 0; i < compare.length; ++i) {
            for (let j = 0; j < data.length; ++j) {
              // console.log(data[j].Lecture_ID,compare[i].Lecture_ID,data[j].Lecture_ID === compare[i].Lecture_ID);
              // console.log(data[j].ID,compare[i].ID,data[j].ID === compare[i].ID);
              // console.log(compare[i].result,data[j].result,compare[i].result = data[j].result);
              // console.log(compare[i].status,data[j].status,compare[i].status = data[j].status);
              if (
                data[j].Lecture_ID === compare[i].Lecture_ID &&
                data[j].ID === compare[i].ID
              ) {
                compare[i].result = data[j].result;
                compare[i].status = data[j].status;
                break;
              }
            }
          }
          // console.log(compare);
          setProcessing(data.processing);
          setGaugeController(false);
          setStudent(compare);
          setID_LIST(compare);
          setLoading(false);
          // setStudentList(JSON.stringify(data)); // 결과 JSON을 입력창에 문자형태로 출력
        });
    } catch (error) {
      console.error(error);
    }
  };

  const subjectAdd = async () => {
    try {
      await fetch(e.serverAddress + "/assignments")
        .then((res) => res.json())
        .then((data) => {
          // console.log("Lec:", data[0]);
          // console.log("Stu:", data[1]);
          // console.log("Datas:", data.result);
          console.log("Datas:", data);
          setLecture(data.result[0]);
          setStudent(data.result[1]);
          setID_LIST(data.result[1]);
          // console.log("setLec:", lecture);
          // console.log("setStu:", student);
          // console.log("setIDL:", ID_LIST);
          // console.log("processing:", data.processing);
          setProcessing(data.processing);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = (ID) => {
    setOpen(true);
    setDetailID(ID);
  };

  const sideClickOpen = () => {
    setSideOpen(!sideOpen);

    if (sideOpen) {
      setSideStyle({ transform: "translate(100%)", transition: "2s" });
      setArrowStyle({
        transform: "translate(525%) rotateY(180deg)",
        transition: "2s",
      });
    } else {
      setSideStyle({ transform: "translate(0%)", transition: "2s " });
      setArrowStyle({
        transform: "translate(0%) rotateY(0deg)",
        transition: "2s",
      });
    }
  };

  const proPageOpen = () => {
    setProOpen(true);
  };

  const stuPageOpen = () => {
    setStuOpen(true);
  };

  useEffect(() => {
    subjectAdd();
  }, []);

  return (
    <div
      className="assign"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <h1
        style={
          sideOpen
            ? { transform: "translate(0)", transition: "2s" }
            : { transform: "translate(33%)", transition: "2s" }
        }
      >
        채점 페이지
      </h1>
      <div
        style={{
          position: "absolute",
          float: "right",
          left: "0px",
          bottom: "0px",
          width: "100px",
          height: "25px",
          background: "#ffffff88",
          color: "#0ff",
          verticalAlign: "center",
          paddingLeft: "10px",
        }}
      >
        <span>Testing...</span>
      </div>
      <div className="buttonList" style={sideStyle}>
        <div style={{ margin: "30% 0% 3% 3%" }}>
          <MultipleSelect
            subject={subject}
            setSubject={setSubject}
            lecture={lecture}
            setLectureName={setLectureName}
          ></MultipleSelect>
          <div
            onClick={() => proPageOpen()}
            style={{
              float: "right",
              margin: "0 9% 0 0",
              display: "inline-block",
              width: "37%",
              borderRadius: "10vw",
              background: "#56eF56",
              height: "55px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Lottie
              animationData={plusGreen}
              alt="강의 등록하기"
              // onClick={() => proPageOpen()}
              style={{
                // position: 'fixed',
                width: "40%",
                float: "left",
                margin: "-9.5px 0px 0px -8px",
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: "1.4rem",
                margin: "12px 10px 0px 0vw",
                display: "inline-block",
              }}
            >
              강의 등록
            </span>
          </div>
        </div>
        {subject !== ""
          ? lecture.map((data, index) => (
              <div key={index}>
                {data.ID === subject ? (
                  <Paper
                    className="subPaper"
                    key={index}
                    sx={{
                      display: "inline-block",
                      width: "470px",
                      marginLeft: "3%",
                      marginBottom: "5%",
                      backgroundColor: "rgba(230, 230, 230, 0.3)",
                      color: "white",
                    }}
                  >
                    <h4>Lecture Info</h4>
                    <h4>Code : {data.code}</h4>
                    <h4>Professor: {data.professor}</h4>
                    <h4>Name : {data.name}</h4>
                    <h4>Distribution : {data.distribution}</h4>
                    {/* <Lottie
                    animationData={plusg}
                    alt="학생 등록하기"
                    onClick={() => proPageOpen()}
                    style={{
                      display: "inline-block",
                      width: "13%",
                      cursor: "pointer",
                    }}
                     /> */}
                    <div
                      onClick={() => stuPageOpen()}
                      style={{
                        float: "right",
                        display: "inline-block",
                        height: "55px",
                        margin: "0.5vh 0.5vw 1vh 0.3vw",
                        width: "40%",
                        borderRadius: "10vw",
                        background: "#56eF56",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Lottie
                        animationData={plusGreen}
                        alt="학생 등록하기"
                        // onClick={() => proPageOpen()}
                        style={{
                          // position: 'fixed',
                          width: "40%",
                          float: "left",
                          margin: "-10.5px 0px 0px -8px",
                        }}
                      />
                      <span
                        style={{
                          color: "white",
                          fontSize: "1.4rem",
                          margin: "12px 10px 0px 0vw",
                          display: "inline-block",
                        }}
                      >
                        학생 등록
                      </span>
                    </div>
                    <Dialog
                      fullWidth={true}
                      maxWidth={"xl"}
                      open={stuOpen}
                      onClose={() => setStuOpen(!stuOpen)}
                    >
                      <StudentRegister
                        dataID={data.ID}
                        lectureName={lectureName}
                        serverAddress={serverAddress}
                      />
                    </Dialog>
                  </Paper>
                ) : null}
              </div>
            ))
          : null}
        <TextField
          sx={{
            height: "7%",
            width: "90%",
            marginLeft: "3%",
            input: { color: "white" },
          }}
          label="Problem Number"
          type="number"
          onChange={(e) => setPnumber(e.target.value)}
          value={pnumber || ""}
          focused
        ></TextField>
        <MaterialUIPickers
          setPdate={setPdate}
          onChange={(e) => setPdate(e.target.value)}
          value={pdate || ""}
        ></MaterialUIPickers>

        <span
          style={{
            display: "inline-block",
            width: "35%",
            fontSize: "1.3rem",
            marginLeft: "3%",
          }}
        >
          <label>
            REASSIGNMENT
            <input
              type="checkbox"
              onChange={(e) => {
                console.log("ReAssignment:", reAssignment);
                setReAssignment(!reAssignment);
              }}
              value={reAssignment || ""}
              checked={reAssignment}
            ></input>
          </label>
          {/* <label>
            PROCESSING
            <input
              type="checkbox"
              onChange={(e) => {
                console.log("Processing:", processing);
                setProcessing(!processing);
              }}
              value={processing || ""}
              checked={processing}
            ></input>
          </label> */}
        </span>
        <div
          style={{
            display: "inline-block",
            paddingLeft: "5%",
            width: "55%",
            verticalAlign: "middle",
          }}
        >
          {/* <LoadingButton
            size="small"
            color="inherit"
            onClick={() => {
              if (subject === "") alert("강의를 선택하세요.");
              else if (pnumber === undefined || pnumber === "")
                alert("문제번호를 선택하세요.");
              else if (pdate === undefined) alert("제출 기한을 선택하세요.");
              else
                onClickStart({
                  ID_LIST,
                  pnumber,
                  pdate,
                  reAssignment,
                });
            }}
            loading={loading}
            loadingIndicator="실행중..."
            variant="contained"
            sx={{
              width: "210px",
              backgroundColor: "#f0f0f0",
            }}
          >
            {/* <p style={{ color: "black" }}>
              <PlayArrowIcon
                fontSize="12px"
                sx={{ margin: "0px 12px 0px 0px" }}
              />
              검사 실행
            </p> */}
          {/* </LoadingButton>  */}
          <div style={{ width: "100%" }}>
            <img
              src={submitController ? submit : processing ? sb_d : sb}
              alt="submit"
              style={{ width: "80%", cursor: "pointer" }}
              onClick={() => {
                if (processing)
                  alert(
                    "현재 서버에서 채점이 진행중입니다.\n잠시만 기다려주세요!"
                  );
                else if (subject === "") alert("강의를 선택하세요.");
                else if (pnumber === undefined || pnumber === "")
                  alert("문제번호를 선택하세요.");
                else if (pdate === undefined) alert("제출 기한을 선택하세요.");
                else {
                  onClickStart({
                    ID_LIST,
                    pnumber,
                    pdate,
                    reAssignment,
                  });
                  setSubmitController(true);
                  setProcessing(true);
                  setTimeout(() => {
                    setSubmitController(false);
                  }, 4000);
                }
              }}
            />
            <img
              src={gaugeController ? gauge : gg}
              alt="gauge"
              style={{ width: "80%" }}
            />
          </div>
          <div></div>
        </div>

        <h3 style={{ display: "inline-block" }}>COPY RESULT</h3>
        <div
          style={{
            display: "inline-block",
            paddingLeft: "12%",
            verticalAlign: "middle",
          }}
        >
          <img
            src={copyController ? copyGif : cp}
            alt="copy"
            style={{ width: "5vw", height: "5vw", cursor: "pointer" }}
            onClick={() => {
              handleCopy();
            }}
            variant="contained"
            sx={{
              marginLeft: "10%",
              width: "210px",
              marginTop: "10px",
              backgroundColor: "#000000",
            }}
          />
          {/* <Button
            size="small"
            color="inherit"
            onClick={() => {
              handleCopy();
            }}
            variant="contained"
            sx={{
              marginLeft: "10%",
              width: "210px",
              marginTop: "10px",
              backgroundColor: "#000000",
            }}
          >
            {/* <p style={{ color: "black" }}> */}
          {/* <ContentCopyIcon
                fontSize="12px"
                sx={{ margin: "0px 12px 0px 0px" }}
              /> */}
          {/* 결과 복사하기 */}

          {/* </p> */}
          {/* </Button> */}
        </div>
        <hr></hr>
        <div style={{ marginLeft: "3%" }}>
          <CopyRadioButtonsGroup
            copy={copy}
            setCopy={setCopy}
          ></CopyRadioButtonsGroup>
        </div>
      </div>

      {/* <MediaCard></MediaCard> */}
      <div
        className="input"
        style={
          sideOpen
            ? { transform: "translate(0)", transition: "2s" }
            : { transform: "translate(40%)", transition: "2s" }
        }
      >
        <div
          className="p-head"
          style={{
            backgroundColor: "rgb(86 239 86)",
            color: "white",
            borderRadius: "5px 5px 0 0",
            position: "sticky",
            top: "0px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <span>{lectureName}</span>
          <span>
            <strong>학번</strong>
          </span>
          <span>
            <strong>이름</strong>
          </span>
          <span>
            <strong>아이디</strong>
          </span>
          <span>
            <strong>결과</strong>
          </span>
        </div>
        <div className="overScroll">
          {subject &&
            student.map((data, index) => (
              <React.Fragment key={index}>
                {subject === data.Lecture_ID ? (
                  <div className="p-head">
                    <span>{lectureName}</span>
                    <span>{data.ID}</span>
                    <span>{data.name}</span>
                    <span>{data.bojid}</span>
                    <span
                      onClick={() => handleClickOpen(data.ID)}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      {String(data.result) === "undefined"
                        ? ""
                        : String(data.result)}
                    </span>
                    {/* <input type="text" value={data} id={"ID"+index} ></input> */}
                  </div>
                ) : null}
              </React.Fragment>
            ))}
        </div>
      </div>
      <div
        className="arrow"
        style={arrowStyle}
        onClick={() => sideClickOpen()}
      />
      <MaxWidthDialog
        open={open}
        setOpen={setOpen}
        pnumber={pnumber}
        detailID={detailID}
        student={student}
        subject={subject}
      ></MaxWidthDialog>

      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={proOpen}
        onClose={() => setProOpen(!proOpen)}
      >
        <ProRegister serverAddress={serverAddress} setProOpen={setProOpen} />
      </Dialog>
    </div>
  );
};

export default Assignments;
