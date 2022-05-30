import React, { useState } from 'react'

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

  const deletButtonClick = () => {
    setDeleteButton(!deleteButton)
  }

  return (
    <>
      <button
        type="button"
        onClick={deletButtonClick}
        className="comment_delete_button"
      >
        X
      </button>
      <Dialog
        open={deleteButton}
        onClose={deletButtonClick}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent>
          <div>
            <input
              onChange={(e) => setCommentDeleteName(e.target.value)}
              placeholder="Name"
              type="text"
              value={commentDeleteName}
            />
            <input
              onChange={(e) => setCommentDeletePassword(e.target.value)}
              placeholder="password"
              type="password"
              value={commentDeletePassword}
            />
            <button
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
              Signup
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Delete
