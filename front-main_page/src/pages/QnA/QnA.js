import React, { useEffect, useState } from 'react'
import './qna.css'

import CommentContent from './commentcontent'
import Create from './create'
import Delete from './delete'
import CommentAdd from './commentAdd'
import InnerComment from './innerComment'

const QnA = () => {
  // 유저 보관함
  const [users, setUsers] = useState([])

  // 댓글 보관함
  const [comments, setComments] = useState([])

  // 유저가 있는지 판별하는 compare
  const compare = (body) => {
    /****** users 존재 비교문 ******/

    // 만약 입력된 user가 존재한다면
    const userCompare = users.find((p) => p.name === body.name)

    // 만약 userCompar가 없다면
    if (userCompare !== undefined) {
      // 만약 비밀번호만 다르다면
      if (userCompare.password !== body.password)
        // 오류 출력
        return alert('비밀번호가 같지 않습니다.')

      return true
    }

    // 유저가 없다면
    else {
      return alert('사용자가 없습니다.')
    }

    /*******************************/
  }

  // 컨텐츠를 댓글에 보관하기 위한 add 함수
  const commentAdd = (props) => {
    try {
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      const body = {
        id: comments.length,
        name: props.commentAddName,
        password: props.commentAddPassword,
        content: props.commentAddContent,
      }

      // 유저가 하나도 없으면
      if (users.length === 0) return alert('사용자가 없습니다.')

      if (compare(body) === true)
        // 댓글 보관함에 저장
        setComments([...comments, body])
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  // 삭제 기능
  const commentDelete = async (props) => {
    try {
      const body = {
        id: props.commentId,
        name: props.commentDeleteName,
        password: props.commentDeletePassword,
      }

      /****** comments 존재 비교문 ******/

      // 만약 삭제할 comments 찾기
      const commentsCompare = comments.find((c) => c.id === body.id)

      console.log(commentsCompare)
      // 만약 user가 다르다면
      if (
        commentsCompare.name !== body.name ||
        commentsCompare.password !== body.password
      ) {
        // 오류 출력
        return alert('사용자가 없습니다.')
      }
      // 댓글 보관함에 저장
      setComments(comments.filter((value) => value.id !== body.id))
      return

      /*******************************/
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  // 댓글보관함이 수정 될 때 마다 리로딩
  useEffect(() => {
    console.log('users: ' + users.length)
    console.log('comments: ' + comments.length)
  }, [comments, users])

  return (
    <div className="comments">
      {/* 회원가입 부분 */}
      <Create users={users} setUsers={setUsers} />

      {/* 댓글 추가 부분 */}
      <CommentAdd commentAdd={commentAdd} />

      {/* 댓글 내용 출력 부분 */}
      {comments.map((comment, index) => (
        <div key={index} className="comments_print">
          <CommentContent comment={comment} />

          {/* 삭제 버튼 */}
          <Delete
            // commentDelete 함수를 delete 컴포넌트에 전송
            commentId={comment.id}
            commentDelete={commentDelete}
          />

          <InnerComment commentId={comment.id} compare={compare} />
        </div>
      ))}
    </div>
  )
}

export default QnA
