import React from "react";
import "./user.css";
import usersJ from "./users.json";

const UserPage = () => {
  const save = usersJ;

  return (
    <div className="user">
      <h1>
        {save.Id} {save.class_level}
      </h1>
      <h1>{save.user_tear}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: save.solved_tear_chart }}
        style={{ width: "40%", display: "inline-block" }}
      ></div>
      <div className="tearTable">
        <table>
          <thead></thead>
          {save.solved_tear.map((BigTears) => (
            <tbody key={BigTears.big_tear}>
              <tr>
                <td colSpan="3">{BigTears.big_tear}</td>
              </tr>

              {BigTears.type.map((tear) => (
                <tr key={tear.tear}>
                  <td>{tear.tear}</td>
                  <td>{tear.problem}</td>
                  <td>{tear.EXP}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: save.solved_tag_chart }}
        style={{ width: "40%", display: "inline-block" }}
      ></div>
      <div>
        <table className="tag">
          <thead></thead>
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

      <div className="problem">
        {save.user_problems.map((problem, index) => (
          <a
            key={index}
            href={"https://www.acmicpc.net/problem/" + problem}
            style={{ textDecorationLine: "none", color: "#000" }}
          >
            {problem} {""}
          </a>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
