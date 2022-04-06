import React, { useEffect, useState } from 'react'
import './qna.css'

const QnA = () => {
  const [commentAddName, setCommentAddName] = useState('')
  const [commentAddPassword, setCommentAddPassword] = useState('')
  const [commentAddContent, setCommentAddContent] = useState('')
  const [test, setTest] = useState([])

  // 댓글이 제대로 등록 될때 실행(사실 props.error의 내용이 변한때마다 실행)

  return (
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
        >
          댓글 작성
        </button>
        {/* <span>{props.error}</span> */}
      </div>
    </div>
  )
}

export default QnA
