import React from 'react'

const CommentContent = (props) => {
  return (
    <div>
      <div className="comments_print_user">name = {props.comment.name}</div>

      {/* 댓글 내용 */}
      <div className="comments_print_content">{props.comment.content}</div>
    </div>
  )
}

export default CommentContent
