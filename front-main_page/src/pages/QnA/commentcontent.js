import React from 'react'

const CommentContent = (props) => {
  // console.log(props)
  return (
    <div>
      <div className="comments_print_user">name = {props.comment.userId}</div>
      <div className="comments_print_user">
        createAt = {props.comment.createdAt}
      </div>
      {/* 댓글 내용 */}
      <div className="comments_print_content">{props.comment.content}</div>
    </div>
  )
}

export default CommentContent
