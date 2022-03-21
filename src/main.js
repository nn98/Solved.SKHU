import { useEffect, useState } from 'react'
import './styles/main.scss'
import Footer from './footer'
import MainMenu from './mainMenu'

const Main = () => {
  const [users, setUsers] = useState([])

  const userUpdate = () => {
    let a = []
    for (let i = 0; i < 15; i++) {
      a = [
        ...a,
        {
          index: i,
          lsj: 'lsj',
          date: '2022-03-08 08:21:33',
          ip: '121.134.133.242',
          login: '로그인',
        },
      ]
    }
    setUsers(a)
  }

  useEffect(() => {
    userUpdate()
  }, [])

  return (
    <div className="main">
      <MainMenu test={1} />
      <div className="container2">
        <div className="nav">&gt; 시스템 관리 &gt; 로그기록</div>

        <div className="panel">
          <h1 className="panel-header">로그기록 목록</h1>
          <div className="panel_body">
            <button type="button" className="btn2 red small right">
              선택항목 삭제
            </button>

            <div className="form">
              <select defaultValue="0">
                <option value="0">정렬순서</option>
                <option value="1">IP</option>
                <option value="2">URL</option>
                <option value="3">카테고리</option>
              </select>

              <select defaultValue="0">
                <option value="0">조회조건</option>
                <option value="1">IP</option>
                <option value="2">URL</option>
                <option value="3">카테고리</option>
                <option value="4">내용</option>
              </select>
              <input type="text" />
              <button type="submit" className="btn2 cyan small">
                조회
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>ID</th>
                  <th>사용자</th>
                  <th>날짜</th>
                  <th>IP</th>
                  <th>category</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{user.index}</td>
                    <td>{user.lsj}</td>
                    <td>{user.date}</td>
                    <td>{user.ip}</td>
                    <td>{user.login}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <select defaultValue="15" className="right">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="100">100</option>
            </select>

            <ul className="pagination">
              <li className="active">1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>Next</li>
            </ul>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Main
