import React, { useEffect, useState } from 'react'
import './qna.css'
import usersJ from '../users.json'
import CommentContent from './commentcontent'
import Create from './create'
import Delete from './delete'
import CommentAdd from './commentAdd'
import InnerComment from './innerComment'

const QnA = () => {
  // 문제 번호
  const [problem, setProblem] = useState('1000')

  // 댓글 보관함
  const [comments, setComments] = useState([])

  // 대댓글 보관함
  const [innerComments, setInnerComments] = useState([])

  const qnaFind = async () => {
    try {
      const res = await fetch('http://localhost:3001/QnA').then((res) =>
        res.json()
      )
      setComments(res)
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  // 댓글보관함이 수정 될 때 마다 리로딩
  useEffect(() => {
    qnaFind()
  }, [])

  // 컨텐츠를 댓글에 보관하기 위한 add 함수
  const commentAdd = async (props) => {
    try {
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      const body = {
        content: props.commentAddContent,
        userIP: 155,
        userId: props.commentAddName,
        problem: problem,
        password: props.commentAddPassword,
      }
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch('http://localhost:3001/QnAAdd', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          if (data.error) {
            if (data.error === 1062) alert('이미 있는 사용자입니다.')
          } else {
            alert(data.data)
          }
        })
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
        problemNum: problem,
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

  return (
    <div className="comments">
      {/* 회원가입 부분 */}
      <Create />

      <select onChange={(e) => setProblem(e.target.value)}>
        {usersJ.user_problems.map((p, index) => (
          <option key={index} value={p}>
            {p}
          </option>
        ))}
      </select>
      <hr />

      {/* 댓글 추가 부분 */}
      <CommentAdd commentAdd={commentAdd} />

      {/* 댓글 내용 출력 부분 */}
      {comments.map((comment, index) =>
        comment.problem === problem ? (
          <div key={index} className="comments_print">
            <CommentContent comment={comment} />

            {/* 삭제 버튼 */}
            <Delete
              // commentDelete 함수를 delete 컴포넌트에 전송
              commentId={comment.id}
              commentDelete={commentDelete}
            />

            <InnerComment
              commentId={comment.id}
              innerComments={innerComments}
              setInnerComments={setInnerComments}
            />
          </div>
        ) : null
      )}
    </div>
  )
}

export default QnA
