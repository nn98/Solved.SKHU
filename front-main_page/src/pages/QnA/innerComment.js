import React, { useEffect, useState, useRef } from 'react'

import Delete from './delete'
import CommentAdd from './commentAdd'
import CommentContent from './commentcontent'

import Box from '@mui/material/Box'
import Portal from '@mui/material/Portal'

const InnerComment = (e) => {
  // 대댓글 보관함
  const [innerComments, setInnerComments] = useState([])

  // 매게변수로 받은 commentid 값
  const { commentId, users } = e

  // dropdown 박스용
  const [innerCommentButton, setInnerCommentButton] = useState(false)
  const innerCommentContainer = useRef(null)
  const innerCommmentButtonClick = () => {
    setInnerCommentButton(!innerCommentButton)
  }

  useEffect(() => {
    console.log(innerComments.length)
  }, [innerComments])

  // 대댓글 추가 기능
  const innerCommentAdd = async (props) => {
    try {
      console.log('ineer ' + users.length)
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      const body = {
        name: props.commentAddName,
        passeword: props.commentAddPassword,
        content: props.commentAddContent,
      }

      // 유저를 찾기 위한 반목문 실행
      for (let i = 0; i < users.length; i++) {
        // user의 이름과 입력받은 이름이 같으면
        if (users[i].name === props.commentAddName) {
          // 만약 비밀번호만 다르다면
          if (users[i].password !== props.commentAddPassword)
            // 오류 출력
            return alert('비밀번호가 같지 않습니다.')
          // 댓글 보관함에 저장
          setInnerComments([body, ...innerComments])
          return
        }

        // 오류 메세지 출력
        return alert('사용자가 없습니다.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 삭제 기능
  const innerCommentDelete = async (props) => {
    try {
      for (let i = 0; i < users.length; i++) {
        // user의 이름과 입력받은 이름이 같으면
        if (users[i].name === props.commentDeleteName) {
          // 만약 비밀번호만 다르다면
          if (users[i].password !== props.commentDeletePassword)
            // 오류 출력
            return alert('비밀번호가 같지 않습니다.')
          // 댓글 보관함에 삭제 후 저장
          setInnerComments(innerComments.filter((value, index) => index !== i))
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

  return (
    <>
      <button
        type="button"
        onClick={innerCommmentButtonClick}
        className="comment_button"
      >
        더보기
      </button>
      <Box ref={innerCommentContainer}>
        {innerCommentButton ? (
          <Portal container={innerCommentContainer.current}>
            <div className="innerComments_print">
              {innerComments.map((innerComment, index) => (
                <div key={index} className="comments_print">
                  {/* 댓글 내용 */}
                  <CommentContent comment={innerComment} />

                  {/* 삭제 버튼 */}
                  <Delete commentDelete={innerCommentDelete} />
                </div>
              ))}
              {/* 작성 부분 */}
              <CommentAdd commentAdd={innerCommentAdd} />
            </div>
          </Portal>
        ) : null}
      </Box>
    </>
  )
}
export default InnerComment
