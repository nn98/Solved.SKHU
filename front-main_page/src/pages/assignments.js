import React, { useState } from "react";
import "./assignments.css";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MediaCard from "./MediaCard";

const Assignments = () => {
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState();
  const [pnumber, setPnumber] = useState();
  const [pdate, setPdate] = useState();

  const onClickEvente = () => {
    alert("클립보드에 복사되었습니다.");
  };

  const onClickStart = async (props) => {
    try {
      setLoading(true);
      // 매개변수로 받은 JSON형태 데이터를 조건에 맞게 바꾸기 위해 다시 정의
      const sbody = {
        sl: props.studentList.split(/[\t\n ,]+/),
        pn: props.pnumber,
        pd: props.pdate,
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
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          console.log(data);
          setStudentList(JSON.stringify(data)); // 결과 JSON을 입력창에 문자형태로 출력
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="assign">
      <h1>채점 페이지</h1>
      <MediaCard></MediaCard>
      <div className="input">
        <textarea
          placeholder=" Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        .&#13;&#10;
        .&#13;&#10;
        .&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;"
          onChange={(e) => setStudentList(e.target.value)}
          value={studentList}
        ></textarea>
      </div>
      <div className="buttonList">
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
              studentList,
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
        <Button
          size="small"
          color="inherit"
          onClick={() => onClickEvente()}
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
