import React, { useState } from 'react'

import Logo from '../../image/logo.png'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { VerticalAlignCenter } from '@mui/icons-material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const Create = (e) => {
  // 회원가입 열고 닫기 창
  const [open, setOpen] = useState(false)
  const userHandleOpen = () => setOpen(!open)

  // 유저를 위한 name password
  const [createUserName, setCreateUserName] = useState('')
  const [createUserPassword, setCreateUserPassword] = useState('')

  // 새 유저를 생성하기 위한 createUser 함수
  const createUser = async (props) => {
    try {
      // 유저 정보 body에 저장
      const body = {
        name: props.createUserName,
        password: props.createUserPassword,
      }

      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch(e.serverAddress + '/QnAUser', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          if (data.error) {
            if (data.error === 1062) alert('이미 있는 사용자입니다.')
          } else {
            alert(data.data)
            userHandleOpen()
          }
        })
    } catch (error) {
      // 위에서 오류가 걸린다면
      alert('2실패하였습니다.')
      console.error(error)
    }
  }

  return (
    <div className="comments_create">
      <button className="comment_button" onClick={userHandleOpen}>
        회원가입
      </button>
      <Dialog
        open={open}
        onClose={userHandleOpen}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent sx={{ width: '500%' }}>
          <img
            src={Logo}
            style={{ marginTop: '1%', width: '3rem' }}
            alt="profile"
          />
          {/* <spna>Sign Up</spna> */}
          <input
            className="input_name"
            onChange={(e) => setCreateUserName(e.target.value)}
            placeholder="Name"
            type="text"
            value={createUserName}
          />
          <input
            className="input_password"
            onChange={(e) => setCreateUserPassword(e.target.value)}
            placeholder="password"
            type="password"
            value={createUserPassword}
          />
          <button
            className="input_button"
            disabled={!createUserName || !createUserPassword}
            name="commenting"
            value="Signup"
            onClick={() => {
              createUser({ createUserName, createUserPassword })
              // createUserName과 createUserPassword 빈칸으로 만들기
              setCreateUserName('')
              setCreateUserPassword('')
            }}
          >
            Signup
          </button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Create
