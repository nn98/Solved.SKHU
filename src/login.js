import React from 'react'
import './styles/login.css'
import './styles/common2.css'
import SkhuLogo from './image/skhu_logo.png'
import Footer from './footer'
import MainMenu from './mainMenu'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <MainMenu />
      <div className="container2">
        <div className="login-form">
          <h1 className="login-header">소프 게시판 로그인</h1>
          <div className="login-body">
            <img src={SkhuLogo} width="200px" alt="profile" />
            <form method="post" action="main.jsp">
              <div className="input">
                <i className="fa fa-user fa-lg"></i>
                <input type="text" name="loginName" placeholder="아이디" />
              </div>{' '}
              <br />
              <div className="input">
                <i className="fa fa-key fa-lg"></i>
                <input type="password" name="password" placeholder="비밀번호" />
              </div>{' '}
              <br />
              <Link to="./main">
                <button type="submit" className="btn2 blue">
                  <i className="fa fa-sign-in"></i> 로그인
                </button>
              </Link>
              <Link to="./signup">
                <button type="submit" className="btn2">
                  <i className="fa fa-user-plus"></i> 회원가입
                </button>
              </Link>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Login
