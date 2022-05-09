import React, { useEffect, useState, useRef } from 'react'

import Delete from './delete'
import CommentAdd from './commentAdd'
import CommentContent from './commentcontent'

import Box from '@mui/material/Box'
import Portal from '@mui/material/Portal'

const InnerComment = (e) => {
  // 매게변수로 받은 commentid 값
  const { commentId, innerComments, setInnerComments } = e

  // dropdown 박스용
  const [innerCommentButton, setInnerCommentButton] = useState(false)
  const innerCommentContainer = useRef(null)
  const innerCommmentButtonClick = () => {
    setInnerCommentButton(!innerCommentButton)
  }

  useEffect(() => {
    console.log('innerComments' + JSON.stringify(innerComments))
  }, [innerComments])

  // 대댓글 추가 기능
  const innerCommentAdd = async (props) => {
    try {
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      const body = {
        commentId: commentId,
        id: innerComments.length,
        name: props.commentAddName,
        password: props.commentAddPassword,
        content: props.commentAddContent,
      }

      // user가 있는지 판별하는 함수 compare
      if (e.compare(body) === true)
        // 댓글 보관함에 저장
        setInnerComments([...innerComments, body])
    } catch (error) {
      console.error(error)
    }
  }

  // 삭제 기능
  const innerCommentDelete = async (props) => {
    try {
      const body = {
        // innercomment 의 id값을 받는다.
        id: props.commentId,
        name: props.commentDeleteName,
        password: props.commentDeletePassword,
      }
      /****** comments 존재 비교문 ******/

      // 만약 삭제할 comments 찾기
      const commentsCompare = innerComments.find((c) => c.id === body.id)

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
      setInnerComments(innerComments.filter((value) => value.id !== body.id))
      return

      /*******************************/
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
              {innerComments.map((innerComment, index) =>
                innerComment.commentId === commentId ? (
                  <div key={index} className="comments_print">
                    {/* 댓글 내용 */}
                    <CommentContent comment={innerComment} />

                    {/* 삭제 버튼 */}
                    <Delete
                      commentId={innerComment.id}
                      commentDelete={innerCommentDelete}
                    />
                  </div>
                ) : (
                  ''
                )
              )}
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
