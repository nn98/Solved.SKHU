import React, { useEffect, useState } from 'react'
import './qna.css'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
  const [commentAddName, setCommentAddName] = useState('')
  const [commentAddPassword, setCommentAddPassword] = useState('')
  const [commentAddContent, setCommentAddContent] = useState('')
  const [comments, setComments] = useState([])
  const add = (props) => {
    const body = {
      addName: props.commentAddContent,
      addPasseword: props.commentAddPassword,
      addContent: props.commentAddContent,
    }
    // console.log(body)
    setComments([...comments, body])
  }

  useEffect(() => {
    console.log(comments)
  }, [comments])

  // 댓글이 제대로 등록 될때 실행(사실 props.error의 내용이 변한때마다 실행)

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
                // onChange={(e) => setCreateUserName(e.target.value)}
                placeholder="Name"
                type="text"
                // value={createUserName}
              />
              <input
                // onChange={(e) => setCreateUserPassword(e.target.value)}
                placeholder="password"
                type="password"
                // value={createUserPassword}
              />

              <button
                // disabled={!createUserName || !createUserPassword}
                name="commenting"
                value="Signup"
                // onClick={() => createUser({ createUserName, createUserPassword })}
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
