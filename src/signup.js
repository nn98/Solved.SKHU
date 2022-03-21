import React from 'react'
import './styles/main.css'
import './styles/signup.css'
import Footer from './footer'
import MainMenu from './mainMenu'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <>
      <MainMenu test={1} />
      <div className="container2">
        <div className="nav">&gt; 회원가입</div>

        <div className="panel">
          <h1 className="panel-header">회원가입</h1>
          <div className="panel-body">
            <form method="post" action="main.jsp">
              <div>
                <label>사용자 아이디:</label>
                <input
                  type="text"
                  name="userid"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <div>
                <label>비밀번호:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <div>
                <label>비밀번호 확인:</label>
                <input
                  type="password"
                  name="password2"
                  placeholder="비밀번호를 한 번 더 입력하세요"
                />
              </div>
              <div>
                <label>이름:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label>이메일:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일 주소를 입력하세요"
                />
              </div>
              <Link to="/main">
                <button type="submit" className="btn2 blue">
                  <i className="fa fa-user-plus"></i> 회원가입
                </button>
              </Link>
              <Link to="/main" className="btn2 cyan">
                <i className="fa fa-google"></i> google 계정으로 가입
              </Link>
              <Link to="/main" className="btn2">
                <i className="fa fa-times"></i> 취소
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
