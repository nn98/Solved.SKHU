import React, { useEffect, useState } from "react";
import "./user.css";
import usersJ from "./users.json";
import { useLocation } from "react-router-dom";
// import { NULL } from "mysql/lib/protocol/constants/types";

const UserPage = () => {
  const location = useLocation();
  const save = usersJ;
  const [user, setUser] = useState([]);
  const [opens, setOpens] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const userAdd = async () => {
    try {
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: "POST", // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          "Content-Type": "application/json",
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(location.state),
      };
      await fetch("http://localhost:3001/userPage", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setUser(data);
          console.log(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickEnter = (tear) => {
    let open = [false, false, false, false, false, false];

    for (let i = 0; i < opens.length; i++) {
      open[i] = opens[i];
    }
    open[tear] = !open[tear];
    setOpens(open);
  };

  useEffect(() => {
    if (location.state) userAdd();
  });

  return (
    <div className="user">
      <h1>
        {save.Id} {save.class_level}
      </h1>
      <h1>{save.user_tear}</h1>

      <div className="use">
        <div className="tearTable">
          <p>난이도 분포</p>
          <div
            dangerouslySetInnerHTML={{ __html: save.solved_tear_chart }}
            style={{ width: "50%", float: "left" }}
          ></div>
          <table>
            <thead>
              <tr>
                <th>레벨</th>
                <th>문제</th>
                <th>EXP</th>
              </tr>
            </thead>
            {save.solved_tear.map((BigTears, index) => (
              <tbody key={BigTears.big_tear}>
                <tr>
                  <td
                    colSpan="3"
                    onClick={() => onClickEnter(index)}
                    className="BigTears"
                  >
                    {BigTears.big_tear}
                  </td>
                </tr>
                <>
                  {BigTears.type.map((tear) => (
                    <tr
                      key={tear.tear}
                      style={{
                        display: opens[index] === false ? "none" : "revert",
                      }}
                    >
                      <td>{tear.tear}</td>
                      <td>{tear.problem}</td>
                      <td>{tear.EXP}</td>
                    </tr>
                  ))}
                </>
              </tbody>
            ))}
          </table>
        </div>

        <div className="problem">
          <div
            className="p-head"
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px 5px 0 0",
              position: "sticky",
              top: "0px",
            }}
          >
            <span>#</span>
            <span>제목</span>
            <span>해결</span>
            <span>시도</span>
          </div>
          {save.user_problems.map((problem, index) => (
            <div key={index} className="p-head">
              <a
                key={index}
                href={"https://www.acmicpc.net/problem/" + problem}
                style={{ textDecorationLine: "none", color: "#000" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{problem}</span>
                <span>제목</span>
                <span>해결</span>
                <span>{index * problem}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="tagTable">
          <p>태그 분포</p>
          <div
            dangerouslySetInnerHTML={{ __html: save.solved_tag_chart }}
            style={{ width: "50%", float: "left" }}
          ></div>
          <table>
            <thead>
              <tr>
                <th>태그</th>
                <th>문제</th>
                <th>EXP</th>
              </tr>
            </thead>
            <tbody>
              {save.solved_tag.map((tags) => (
                <tr key={tags.name}>
                  <td>{tags.name}</td>
                  <td>{tags.problem}</td>
                  <td>{tags.EXP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
