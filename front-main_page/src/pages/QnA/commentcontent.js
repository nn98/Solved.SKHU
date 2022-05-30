import React from 'react'
import Delete from './delete'

const CommentContent = (props) => {
  // console.log(props)
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <span className="comments_print_user">{props.comment.USER_ID} </span>
        <span className="comments_print_date">
          {props.comment.createdat.substring(0, 10)}
        </span>
        <Delete
          // commentDelete 함수를 delete 컴포넌트에 전송
          commentId={props.comment.ID}
          commentDelete={props.commentDelete}
        />
      </div>
      {/* 댓글 내용 */}
      <div className="comments_print_content">{props.comment.content}</div>
    </div>
  )
}

export default CommentContent
