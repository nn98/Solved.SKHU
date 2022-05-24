import React from 'react'

const CommentContent = (props) => {
  // console.log(props)
  return (
    <div>
      <span className="comments_print_user">{props.comment.USER_ID} </span>
      <span className="comments_print_date">
        {props.comment.createdat.substring(0, 10)}
      </span>
      {/* 댓글 내용 */}
      <div className="comments_print_content">{props.comment.content}</div>
    </div>
  )
}

export default CommentContent
