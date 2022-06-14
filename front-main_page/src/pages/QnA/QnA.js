import React, { useEffect, useState } from 'react'
import './qna.css'
import CommentContent from './commentcontent'
import Create from './create'
import CommentAdd from './commentAdd'
import InnerComment from './innerComment'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const QnA = (e) => {
  // 문제 번호
  const [problem, setProblem] = useState('')
  const [problems, setProblems] = useState([])

  // 댓글 보관함
  const [comments, setComments] = useState([])

  // 댓글 출력문
  const qnaFind = async () => {
    try {
      const res = await fetch(e.serverAddress + '/QnA').then((res) =>
        res.json()
      )
      setComments(res)
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  const problemAdd = async () => {
    try {
      const res = await fetch(e.serverAddress + '/QnAProblem').then((res) =>
        res.json()
      )
      setProblems(res)
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  // 댓글보관함이 수정 될 때 마다 리로딩
  useEffect(() => {
    problemAdd()
    qnaFind()
  }, [])

  // 컨텐츠를 댓글에 보관하기 위한 add 함수
  const commentAdd = async (props) => {
    try {
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      if (problem === '' || problem === 'null') {
        return alert('문제 선택')
      }
      const body = {
        content: props.commentAddContent,
        userIP: '155',
        userId: props.commentAddName,
        problem: problem,
        password: props.commentAddPassword,
      }
      // console.log(body)

      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch(e.serverAddress + '/QnAAdd', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          if (data.error) {
            alert(data.error)
          } else {
            setComments(data)
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
        ID: props.commentId,
        userId: props.commentDeleteName,
        password: props.commentDeletePassword,
      }
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch(e.serverAddress + '/QnADelete', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          if (data.error) {
            alert(data.error)
          } else {
            setComments(data)
            // setComments(data)
          }
        })
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  return (
    <div className="comments">
      <h1>성공회대학교 QnA</h1>
      {/* 회원가입 부분 */}

      <Create serverAddress={e.serverAddress} />
      <Autocomplete
        onChange={(event, newValue) => {
          setProblem(String(newValue))
        }}
        sx={{ width: '50%' }}
        freeSolo
        options={
          problems && problems.map((option) => String(option.PROBLEM_ID))
        }
        renderInput={(params) => <TextField {...params} label="문제 번호" />}
      />

      <hr />

      {/* 댓글 추가 부분 */}
      <CommentAdd commentAdd={commentAdd} />

      {/* 댓글 내용 출력 부분 */}
      {comments.map((comment, index) =>
        problem === '' || problem === 'null' || comment.problem === problem ? (
          <div key={index} className="comments_print">
            <h3>
              {problem === '' || problem === 'null'
                ? comment.problem + '번'
                : ''}
            </h3>
            <CommentContent comment={comment} commentDelete={commentDelete} />
            {/* 삭제 버튼 */}

            <InnerComment
              commentId={comment.ID}
              serverAddress={e.serverAddress}
            />
          </div>
        ) : null
      )}
    </div>
  )
}

export default QnA
