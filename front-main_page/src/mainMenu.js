import React, { useState } from "react";
import Logo from "./image/logo.png";
import Main_Top_Line from "./image/main_top_line.png";
import { Link } from "react-router-dom";
import Fade from "@mui/material/Fade";
// import { useLocation } from "react-router-dom";

const MainMenu = (props) => {
  const [mainHover, setMainHover] = useState(false);
  // const location = useLocation();

  return (
    <>
      <div className="main-menu">
        <table>
          <thead>
            <tr>
              <td className="main-log">
                <Link to="/">
                  <button style={{ cursor: "pointer" }}>
                    <img
                      src={Logo}
                      style={{ float: "left", marginLeft: "10%" }}
                      alt="profile"
                    />
                  </button>
                </Link>
              </td>
              <td>
                <Link to="/userPage">
                  <button>User</button>
                </Link>
              </td>
              <td>
                <Link to="/assignments">
                  <button>Assignments</button>
                </Link>
              </td>
              <td>
                <Link to="/rank">
                  <button>Rank</button>
                </Link>
              </td>
              <td>
                <Fade in={!mainHover} timeout={0}>
                  <span
                    onMouseOver={() => setMainHover(true)}
                    style={{ display: mainHover ? "none" : "revert" }}
                  >
                    <button>Recommend</button>
                  </span>
                </Fade>
                <Fade in={mainHover} timeout={500}>
                  <span
                    onMouseOver={() => setMainHover(true)}
                    onMouseOut={() => setMainHover(false)}
                    style={{ display: !mainHover ? "none" : "revert" }}
                  >
                    <Link to="/algorithm">
                      <button className="main-hover">Algorithm</button>
                    </Link>
                    <button className="main-hover">|</button>
                    <Link to="/rating">
                      <button className="main-hover">Rating</button>
                    </Link>
                  </span>
                </Fade>
              </td>
              <td>
                <Link to="/QnA">
                  <button>QnA</button>
                </Link>
              </td>
            </tr>
          </thead>
        </table>
        {/* {location.pathname !== "/register" ? (
          <div>
            <Link to="/register">
              <button
                style={{
                  position: "absolute",
                  top: "1%",
                  right: "5%",
                  fontSize: "15px",
                  borderRadius: "0%",
                  border: "0px",
                  padding: "6px 12px",
                }}
              >
                학생 등록하기
              </button>
            </Link>
          </div>
        ) : null} */}
        <img
          src={Main_Top_Line}
          style={{ width: "90%", margin: "0 5%" }}
          alt="profile"
        />
      </div>
    </>
  );
};

export default MainMenu;
