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

  // 컨텐츠를 댓글에 보관하기 위한 add 함수
  const commentAdd = (props) => {
    try {
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      const body = {
        id: comments.length,
        name: props.commentAddName,
        passeword: props.commentAddPassword,
        content: props.commentAddContent,
      }

      // 유저가 하나도 없으면
      if (users.length === 0) return alert('없는 사용자 입니다.')

      // 유저를 찾기 위한 반목문 실행
      for (let i = 0; i < users.length; i++) {
        // user의 이름과 입력받은 이름이 같으면
        if (users[i].name === props.commentAddName) {
          // 만약 비밀번호만 다르다면
          if (users[i].password !== props.commentAddPassword)
            // 오류 출력
            return alert('비밀번호가 같지 않습니다.')
          // 댓글 보관함에 저장
          setComments([...comments, body])
          return
        }
      }

      // 오류 메세지 출력
      return alert('사용자가 없습니다.')
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  // 삭제 기능
  const commentDelete = async (props) => {
    try {
      // const body = {
      //   deleteId: props.commentDeleteId,
      //   deleteName: props.commentDeleteName,
      //   deletePassword: props.commentDeletePassword,
      // }

      // 유저를 찾기 위한 반목문 실행
      for (let i = 0; i < users.length; i++) {
        // user의 이름과 입력받은 이름이 같으면
        if (users[i].name === props.commentDeleteName) {
          // 만약 비밀번호만 다르다면
          if (users[i].password !== props.commentDeletePassword)
            // 오류 출력
            return alert('비밀번호가 같지 않습니다.')
          // 댓글 보관함에 삭제 후 저장
          setComments(comments.filter((value, index) => index !== i))
          return
        }

        // 오류 메세지 출력
        return alert('사용자가 없습니다.')
      }
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
            commentDelete={commentDelete}
          />

          <InnerComment commentId={comment.id} users={users} />
        </div>
      ))}
    </div>
  )
}

export default QnA
