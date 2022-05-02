import React from 'react'

const CommentContent = (props) => {
  console.log(props)
  return (
    <div>
      <div className="comments_print_user">name = {props.comment.name}</div>
      <div className="comments_print_user">
        problem = {props.comment.problemNum}
      </div>

      {/* 댓글 내용 */}
      <div className="comments_print_content">{props.comment.content}</div>
    </div>
  )
}

export default CommentContent
