import React, { useState } from 'react'

import Logo from '../../image/logo.png'

import DeleteIcon2 from '../../image/deleteIcon_2.png'

import DeleteIcon1 from '../../image/deleteIcon.png'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Delete = (props) => {
  const commentId = props.commentId
  const [commentDeleteName, setCommentDeleteName] = useState('')
  const [commentDeletePassword, setCommentDeletePassword] = useState('')

  const [deleteButton, setDeleteButton] = useState(false)

  const [deleteIcon, setDeleteIcon] = useState(false)

  const deletButtonClick = () => {
    setDeleteButton(!deleteButton)
  }

  return (
    <>
      <button
        type="button"
        onClick={deletButtonClick}
        className="comment_delete_button"
        onMouseOver={() => setDeleteIcon(true)}
        onMouseOut={() => setDeleteIcon(false)}
      >
        <img
          src={deleteIcon ? DeleteIcon1 : DeleteIcon2}
          style={{ width: '0.5rem' }}
          alt="profile"
        />
      </button>
      <Dialog
        open={deleteButton}
        onClose={deletButtonClick}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent>
          <img
            src={Logo}
            style={{ marginTop: '1%', width: '3rem' }}
            alt="profile"
          />
          <input
            className="input_name"
            onChange={(e) => setCommentDeleteName(e.target.value)}
            placeholder="Name"
            type="text"
            value={commentDeleteName}
          />
          <input
            className="input_password"
            onChange={(e) => setCommentDeletePassword(e.target.value)}
            placeholder="password"
            type="password"
            value={commentDeletePassword}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                props.commentDelete({
                  commentId,
                  commentDeleteName,
                  commentDeletePassword,
                })
                setCommentDeleteName('')
                setCommentDeletePassword('')
                deletButtonClick()
              }
            }}
          />
          <button
            className="input_button"
            name="commenting"
            disabled={!commentDeleteName || !commentDeletePassword}
            value="Signup"
            onClick={() => {
              // 매개변수로 받아온 commentDelete 함수를 이용하여 이름, 비밀번호를 보낸다.
              props.commentDelete({
                commentId,
                commentDeleteName,
                commentDeletePassword,
              })
              setCommentDeleteName('')
              setCommentDeletePassword('')
              deletButtonClick()
            }}
          >
            Delete
          </button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Delete
