import React, { useEffect, useState } from "react";
// import rankJ from './rank.json'
import "./rank.css";

const Rank = () => {
  const [ratingProblems, setRatingProblems] = useState([]);
  const ratingAdd = async () => {
    try {
      await fetch("http://localhost:3001/ranking")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setRatingProblems(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => ratingAdd(), []);
  return (
    <div className="rank">
      <h1>성공회대학교 티어 랭킹</h1>
      <div className="rankTable">
        <table>
          <thead>
            <tr>
              <th>전체 랭킹</th>
              <th>랭킹</th>
              <th>아이디</th>
              <th>레이팅</th>
              <th>CLASS</th>
              <th>푼 문제</th>
              <th>정답률</th>
            </tr>
          </thead>
          <tbody>
            {ratingProblems.map((user, index) => (
              <tr key={index}>
                <td>{user.worldrank}</td>
                <td>{user.skhurank}</td>
                <td>
                  <img
                    src={
                      "https://static.solved.ac/tier_small/" +
                      user.tier +
                      ".svg"
                    }
                    alt="profile"
                    style={{ width: "3%", margin: "0 1% 0 0" }}
                  />{" "}
                  <strong>
                    <a
                      href={"https://solved.ac/profile/" + user.User_ID}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.User_ID}
                    </a>
                  </strong>
                </td>
                <td>{user.rating}</td>
                <td>{user.class}</td>
                <td>{user.pro}</td>
                <td>{user.correction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rank;
