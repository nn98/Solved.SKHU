// import { Link } from 'react-router-dom'

import Logo from './image/logo.png'

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
              <td>Menu</td>
              <td>Menu</td>
              <td>Menu</td>
              <td>Menu</td>
            </tr>
          </thead>
        </table>
        <hr style={{ width: '98%', background: '#000' }} />
      </div>
    </>
  )
}

export default MainMenu
