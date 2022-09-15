import React, { useState } from 'react'

const CommentAdd = (props) => {
  // 댓글 추가에 필요한 name password content
  const [commentAddName, setCommentAddName] = useState('')
  const [commentAddPassword, setCommentAddPassword] = useState('')
  const [commentAddContent, setCommentAddContent] = useState('')

  return (
    <div className="comments_input">
      <div>
        <input
          className="comments_input_name"
          onChange={(e) => setCommentAddName(e.target.value)}
          placeholder="Name"
          type="text"
          value={commentAddName}
        />
        <input
          className="comments_input_password"
          onChange={(e) => setCommentAddPassword(e.target.value)}
          placeholder="password"
          type="password"
          value={commentAddPassword}
        />
        <textarea
          className="comment_input_area"
          id="textarea"
          onChange={(e) => setCommentAddContent(e.target.value)}
          placeholder="댓글을 작성하세요"
          value={commentAddContent}
        />
        <div className="comment_input_button">
          <button
            className="comment_button_inner"
            // disabled={
            //   !commentAddContent || !commentAddPassword || !commentAddName
            // }
            name="commenting"
            value="댓글 작성"
            onClick={() => {
              // 매개변수로 받아온 commentAdd 함수를 이용하여 이름, 내용, 비밀번호를 보낸다.
              props.commentAdd({
                commentAddName,
                commentAddContent,
                commentAddPassword,
              })
              setCommentAddContent('')
              setCommentAddName('')
              setCommentAddPassword('')
            }}
          >
            댓글 작성
          </button>
        </div>
        {/* <span>{props.error}</span> */}
      </div>
    </div>
  )
}

export default CommentAdd
