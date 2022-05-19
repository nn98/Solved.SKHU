import React from 'react'

const CommentContent = (props) => {
  // console.log(props)
  return (
    <div>
      <div className="comments_print_user">name = {props.comment.USER_ID}</div>
      <div className="comments_print_user">
        createAt = {props.comment.createdat}
      </div>
      {/* 댓글 내용 */}
      <div className="comments_print_content">{props.comment.content}</div>
    </div>
  )
}

export default CommentContent
