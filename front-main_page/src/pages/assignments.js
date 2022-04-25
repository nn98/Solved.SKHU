import React, { useState } from "react";
import "./assignments.css";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Assignments = () => {
  const [loading, setLoading] = useState(false);

  const onClickEvente = () => {
    alert("클립보드에 복사되었습니다.");
  };

  const onClickStart = () => {
    setLoading(true);
  };

  return (
    <div className="assign">
      <h1>교수님 채점 페이지</h1>
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
        ></textarea>
      </div>
      <div className="buttonList">
        <h3>문제번호</h3>
        <input type="text" placeholder="문제번호"></input>
        <h3>제출기한</h3>
        <input type="date"></input>
        <LoadingButton
          size="small"
          color="inherit"
          onClick={() => onClickStart()}
          loading={loading}
          loadingIndicator="실행중..."
          variant="contained"
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
