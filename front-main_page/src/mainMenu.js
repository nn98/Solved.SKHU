// import { Link } from 'react-router-dom'

import Logo from "./image/logo.png";
import Main_Top_Line from "./image/main_top_line.png";
import { Link } from "react-router-dom";

const MainMenu = (props) => {
  return (
    <>
      <div className="main-menu">
        <table>
          <thead>
            <tr>
              <td>
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
                <Link to="/algorithm">
                  <button>Algorithm</button>
                </Link>
              </td>
              <td>
                <Link to="/rank">
                  <button>Rank</button>
                </Link>
              </td>
              <td>
                <Link to="/assignments">
                  <button>Assignments</button>
                </Link>
              </td>
              <td>
                <Link to="/QnA">
                  <button>QnA</button>
                </Link>
              </td>
            </tr>
          </thead>
        </table>
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
