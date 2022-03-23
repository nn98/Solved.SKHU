// import { Link } from 'react-router-dom'

import Logo from './image/logo.png'
import Main_Top_Line from './image/main_top_line.png'

const MainMenu = (props) => {
  return (
    <>
      <div className="main-menu">
        <table>
          <thead>
            <tr>
              <td>
                <img
                  src={Logo}
                  style={{ float: 'left', marginLeft: '10%' }}
                  alt="profile"
                />
              </td>
              <td>
                <button>Menu</button>
              </td>
              <td>
                <button>Menu</button>
              </td>
              <td>
                <button>Menu</button>
              </td>
              <td>
                <button>Menu</button>
              </td>
            </tr>
          </thead>
        </table>
        <img
          src={Main_Top_Line}
          style={{ width: '90%', margin: '0 5%' }}
          alt="profile"
        />
      </div>
    </>
  )
}

export default MainMenu
