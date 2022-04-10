import React, { useEffect, useState } from 'react'
import './qna.css'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const userCreateStyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const QnA = () => {
  // 유저를 위한 name password
  const [createUserName, setCreateUserName] = useState('')
  const [createUserPassword, setCreateUserPassword] = useState('')

  // 유저 보관함
  const [users, setUser] = useState([])

  // 새 유저를 생성하기 위한 createUser 함수
  const createUser = (props) => {
    try {
      // 유저 정보 body에 저장
      const body = {
        name: props.createUserName,
        Password: props.createUserPassword,
      }

      if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].name === props.createUserName) {
            setCreateUserName('')
            setCreateUserPassword('')
            return alert('현재 사용 중인 사용자가 있습니다.')
          }
        }
      }
      console.log('test')
      // createUserName과 createUserPassword 빈칸으로 만들기
      setCreateUserName('')
      setCreateUserPassword('')

      // 유저 보관함에 추가
      setUser([...users, body])
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  // 댓글 추가에 필요한 name password content
  const [commentAddName, setCommentAddName] = useState('')
  const [commentAddPassword, setCommentAddPassword] = useState('')
  const [commentAddContent, setCommentAddContent] = useState('')

  // 댓글 보관함
  const [comments, setComments] = useState([])

  // 컨텐츠를 댓글에 보관하기 위한 add 함수
  const add = (props) => {
    try {
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      const body = {
        addName: props.commentAddContent,
        addPasseword: props.commentAddPassword,
        addContent: props.commentAddContent,
      }

      console.log(comments[0])

      // 댓글 보관함에 저장
      setComments([...comments, body])
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  // 댓글보관함이 수정 될 때 마다 리로딩
  useEffect(() => {
    console.log('users: ' + users)
    console.log('comments: ' + comments)
  }, [comments, users])

  // 회원가입 열고 닫기 창
  const [open, setOpen] = useState(false)
  const userHandleOpen = () => setOpen(!open)

  return (
    <div className="comments">
      <div>
        <div>
          <button className="comment_button" onClick={userHandleOpen}>
            회원가입
          </button>
          <Modal open={open} onClose={userHandleOpen}>
            <Box sx={userCreateStyle}>
              <input
                onChange={(e) => setCreateUserName(e.target.value)}
                placeholder="Name"
                type="text"
                value={createUserName}
              />
              <input
                onChange={(e) => setCreateUserPassword(e.target.value)}
                placeholder="password"
                type="password"
                value={createUserPassword}
              />

              <button
                disabled={!createUserName || !createUserPassword}
                name="commenting"
                value="Signup"
                onClick={() =>
                  createUser({ createUserName, createUserPassword })
                }
              >
                Signup
              </button>
            </Box>
          </Modal>
        </div>
      </div>

      <div className="comments_input">
        <div>
          <input
            onChange={(e) => setCommentAddName(e.target.value)}
            placeholder="Name"
            type="text"
            value={commentAddName}
          />
          <input
            onChange={(e) => setCommentAddPassword(e.target.value)}
            placeholder="password"
            type="password"
            value={commentAddPassword}
          />
          <textarea
            className="comment_input_area"
            id="textarea"
            onChange={(e) => setCommentAddContent(e.target.value)}
            placeholder="content"
            value={commentAddContent}
          />

          <button
            className="comment_button"
            // disabled={
            //   !commentAddContent || !commentAddPassword || !commentAddName
            // }
            name="commenting"
            value="댓글 작성"
            onClick={() => {
              add({
                commentAddName,
                commentAddContent,
                commentAddPassword,
              })
              setCommentAddName('')
              setCommentAddPassword('')
              setCommentAddContent('')
            }}
          >
            댓글 작성
          </button>
          {/* <span>{props.error}</span> */}
        </div>
      </div>

      {comments.map((comment, index) => (
        <div key={index} className="comments_print">
          <div className="comments_print_user">name = {comment.addName}</div>
          {/* 댓글 내용 */}
          <div className="comments_print_content">{comment.addContent}</div>
        </div>
      ))}
    </div>
  )
}

export default QnA
