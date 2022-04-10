import React, { useEffect, useState } from "react";
import "./user.css";
import usersJ from "./users.json";

const UserPage = () => {
  const save = usersJ;
  const [opens, setOpens] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onClickEnter = (tear) => {
    let open = opens;
    open[tear] = true;
    setOpens(open);
  };

  useEffect(() => {}, [opens]);
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
                <th>문제 수</th>
                <th>EXP</th>
              </tr>
            </thead>
            {save.solved_tear.map((BigTears, index) => (
              <tbody key={BigTears.big_tear}>
                <tr>
                  <td colSpan="3" onClick={() => onClickEnter(index)}>
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
          {save.user_problems.map((problem, index) => (
            <a
              key={index}
              href={"https://www.acmicpc.net/problem/" + problem}
              style={{ textDecorationLine: "none", color: "#000" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {problem} {""}
            </a>
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
                <th>문제 수</th>
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
