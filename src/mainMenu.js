import React from 'react'
import './styles/common2.css'
import { Link } from 'react-router-dom'

const MainMenu = (props) => {
  return (
    <>
      <div className="main-menu">
        <div>
          <h1>소프 게시판</h1>
          {props.test === 1 ? (
            <Link className="right" to="/">
              로그아웃
            </Link>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default MainMenu
