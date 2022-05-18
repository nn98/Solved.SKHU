import "./assignDetail.css";
import { React, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import usersJ from "./users.json";

const AssignDetail = () => {
  const { userId, setUserId } = useState("");
  const save = usersJ;
  const userPaperStyle = {
    display: "inline-block",
    width: "80%",
    margin: "5% 0%",
    padding: "0% 5%",
  };

  useEffect(() => {});

  return (
    <div className="assignDetail">
      <div className="leftSide">
        <Paper elevation={3} sx={userPaperStyle}>
          <h1>USER ID</h1>
        </Paper>
        <h2>최근 제출</h2>
        <hr />
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
          <span>문제</span>
          <span>결과</span>
          <span>제출한 시간</span>
        </div>
        <div className="overScroll">
          {save.solved_tag.map((tags, index) => (
            <div key={index} className="p-head">
              <span>{tags.name}</span>
              <span>{tags.problem}</span>
              <span>{tags.EXP}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rightSide">
        <Paper elevation={3} sx={userPaperStyle}>
          <h1>채점 결과 상세보기</h1>
        </Paper>
      </div>
    </div>
  );
};

export default AssignDetail;
